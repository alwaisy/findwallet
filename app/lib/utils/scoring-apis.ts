import type {
  PlatformScore,
  ScoreCalculationInput,
  ScoreCalculationResult,
  ScoreFetchResult,
} from "@/lib/types/scoring";

/**
 * Fetch platform score from database
 * @param slug - Platform slug (e.g., 'sadapay', 'jazzcash')
 * @returns Promise with score data
 */
export async function fetchPlatformScore(
  slug: string
): Promise<ScoreFetchResult> {
  return await $fetch<ScoreFetchResult>(`/api/scores/${slug}`);
}

/**
 * Calculate and store platform score
 * @param slug - Platform slug
 * @param urls - Object with platform URLs (all optional)
 * @returns Promise with calculation result
 */
export async function calculateAndStoreScore(
  slug: string,
  urls: {
    trustpilot?: string;
    playstore?: string;
    appstore?: string;
  }
): Promise<ScoreCalculationResult> {
  const input: ScoreCalculationInput = { slug, urls };
  return await $fetch<ScoreCalculationResult>(`/api/scores/${slug}`, {
    method: "POST",
    body: input,
  });
}

/**
 * Get platform score with fallback to calculation if not found
 * @param slug - Platform slug
 * @param urls - URLs for calculation if score not found
 * @returns Promise with platform score
 */
export async function getPlatformScore(
  slug: string,
  urls?: {
    trustpilot?: string;
    playstore?: string;
    appstore?: string;
  }
): Promise<PlatformScore | null> {
  try {
    // First try to fetch existing score
    const fetchResult = await fetchPlatformScore(slug);

    if (fetchResult.success && fetchResult.data) {
      return fetchResult.data;
    }

    // If no score found and URLs provided, calculate new score
    if (urls && Object.keys(urls).length > 0) {
      const calcResult = await calculateAndStoreScore(slug, urls);

      if (calcResult.success && calcResult.data) {
        return calcResult.data;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error getting platform score for ${slug}:`, error);
    return null;
  }
}
