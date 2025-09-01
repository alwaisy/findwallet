import type {
  AppStoreReviewData,
  PlayStoreReviewData,
  TrustpilotReviewData,
} from "@/lib/types/reviews";

/**
 * Fetch Trustpilot review data
 * @param url - Full Trustpilot URL
 * @returns Promise with review data
 */
export async function fetchTrustpilotReviews(
  url: string
): Promise<TrustpilotReviewData> {
  return await $fetch<TrustpilotReviewData>("/api/trustpilot-reviews", {
    query: { url },
  });
}

/**
 * Fetch Google Play Store review data
 * @param url - Full Play Store URL
 * @returns Promise with review data
 */
export async function fetchPlayStoreReviews(
  url: string
): Promise<PlayStoreReviewData> {
  return await $fetch<PlayStoreReviewData>("/api/playstore-reviews", {
    query: { url },
  });
}

/**
 * Fetch Apple App Store review data
 * @param url - Full App Store URL
 * @returns Promise with review data
 */
export async function fetchAppStoreReviews(
  url: string
): Promise<AppStoreReviewData> {
  return await $fetch<AppStoreReviewData>("/api/appstore-reviews", {
    query: { url },
  });
}

/**
 * Fetch all review data from multiple platforms
 * @param urls - Object with platform URLs
 * @returns Promise with all review data
 */
export async function fetchAllReviews(urls: {
  trustpilot?: string;
  playstore?: string;
  appstore?: string;
}) {
  const results: {
    trustpilot?: TrustpilotReviewData;
    playstore?: PlayStoreReviewData;
    appstore?: AppStoreReviewData;
  } = {};

  if (urls.trustpilot) {
    try {
      results.trustpilot = await fetchTrustpilotReviews(urls.trustpilot);
    } catch (error) {
      console.error("Failed to fetch Trustpilot reviews:", error);
    }
  }

  if (urls.playstore) {
    try {
      results.playstore = await fetchPlayStoreReviews(urls.playstore);
    } catch (error) {
      console.error("Failed to fetch Play Store reviews:", error);
    }
  }

  if (urls.appstore) {
    try {
      results.appstore = await fetchAppStoreReviews(urls.appstore);
    } catch (error) {
      console.error("Failed to fetch App Store reviews:", error);
    }
  }

  return results;
}
