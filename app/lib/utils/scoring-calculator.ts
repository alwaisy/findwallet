import type { PlatformScore } from "@/lib/types/scoring";
import { fetchAllReviews } from "./review-apis";

interface Logger {
  debug: (message: string, data?: unknown, wallet?: string) => void;
}

/**
 * Calculate weighted score based on review volume and ratings
 * Implements the scoring algorithm from rating_scoring_system.md
 */
export async function calculatePlatformScore(
  slug: string,
  urls: {
    trustpilot?: string;
    playstore?: string;
    appstore?: string;
  },
  logger?: Logger
): Promise<PlatformScore> {
  // Fetch all available review data
  const reviewData = await fetchAllReviews(urls);

  // Log the raw review data if logger is available
  if (logger) {
    logger.debug(`Raw review data fetched`, { reviewData }, slug);
  }

  const sources: {
    trustpilot?: { rating: number; reviews: number };
    playstore?: { rating: number; reviews: number };
    appstore?: { rating: number; reviews: number };
  } = {};

  let totalReviews = 0;

  // Process Trustpilot data
  if (reviewData.trustpilot) {
    const { averageRating, totalReviews: reviews } = reviewData.trustpilot;
    sources.trustpilot = { rating: averageRating, reviews };
    totalReviews += reviews;
  }

  // Process Play Store data
  if (reviewData.playstore) {
    const { averageRating, totalReviews: reviews } = reviewData.playstore;
    sources.playstore = { rating: averageRating, reviews };
    totalReviews += reviews;
  }

  // Process App Store data
  if (reviewData.appstore) {
    const { averageRating, totalReviews: reviews } = reviewData.appstore;
    sources.appstore = { rating: averageRating, reviews };
    totalReviews += reviews;
  }

  // Calculate weights and final score
  let finalWeightedScore = 0;
  let playstoreWeight = 0;
  let appstoreWeight = 0;
  let trustpilotWeight = 0;

  if (totalReviews > 0) {
    if (sources.trustpilot) {
      trustpilotWeight = sources.trustpilot.reviews / totalReviews;
      const normalizedRating = (sources.trustpilot.rating / 5) * 100;
      finalWeightedScore += normalizedRating * trustpilotWeight;
    }
    if (sources.playstore) {
      playstoreWeight = sources.playstore.reviews / totalReviews;
      const normalizedRating = (sources.playstore.rating / 5) * 100;
      finalWeightedScore += normalizedRating * playstoreWeight;
    }
    if (sources.appstore) {
      appstoreWeight = sources.appstore.reviews / totalReviews;
      const normalizedRating = (sources.appstore.rating / 5) * 100;
      finalWeightedScore += normalizedRating * appstoreWeight;
    }
  }

  const result = {
    slug,
    totalScore: Math.round(finalWeightedScore),
    totalReviews,
    playstoreRating: sources.playstore?.rating,
    playstoreReviews: sources.playstore?.reviews,
    playstoreWeight,
    appstoreRating: sources.appstore?.rating,
    appstoreReviews: sources.appstore?.reviews,
    appstoreWeight,
    trustpilotRating: sources.trustpilot?.rating,
    trustpilotReviews: sources.trustpilot?.reviews,
    trustpilotWeight,
    lastUpdated: Math.floor(Date.now() / 1000),
  };

  // Log the final calculated result if logger is available
  if (logger) {
    logger.debug(
      `Score calculation completed`,
      {
        result,
        weightages: {
          playstore: playstoreWeight,
          appstore: appstoreWeight,
          trustpilot: trustpilotWeight,
        },
      },
      slug
    );
  }

  return result;
}
