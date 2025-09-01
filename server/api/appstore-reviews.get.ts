import type { AppStoreReviewData } from "@/lib/types/reviews";

export default defineEventHandler(
  async (event): Promise<AppStoreReviewData> => {
    const query = getQuery(event);
    const url = query.url as string;

    if (!url) {
      throw createError({
        statusCode: 400,
        statusMessage: "URL parameter is required",
      });
    }

    try {
      // Fetch the Apple App Store page
      const response = await $fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Upgrade-Insecure-Requests": "1",
        },
      });

      const html = response as string;

      // Extract total reviews count - handle K (thousands) and M (millions)
      const totalReviewsMatch =
        html.match(/(\d+(?:\.\d+)?[MK]?)\s*Ratings?/i) ||
        html.match(/(\d+(?:\.\d+)?[MK]?)\s*reviews?/i);
      let totalReviews = 0;
      let formattedReviews = "0";
      if (totalReviewsMatch && totalReviewsMatch[1]) {
        const match = totalReviewsMatch[1];
        formattedReviews = match;
        if (match && match.includes("K")) {
          // Convert thousands to actual number
          const number = parseFloat(match.replace("K", ""));
          totalReviews = Math.round(number * 1000);
        } else if (match && match.includes("M")) {
          // Convert millions to actual number
          const number = parseFloat(match.replace("M", ""));
          totalReviews = Math.round(number * 1000000);
        } else if (match) {
          // Regular number
          totalReviews = parseInt(match.replace(/,/g, ""));
        }
      }

      // Extract average rating - try multiple patterns
      const ratingMatch =
        html.match(/(\d+\.\d+)\s+out\s+of\s+5/i) ||
        html.match(/(\d+\.\d+)\s*•\s*\d+\.\d+[KM]?\s*Ratings/i) ||
        html.match(/(\d+\.\d+)\s*stars?/i);
      const averageRating =
        ratingMatch && ratingMatch[1] ? parseFloat(ratingMatch[1]) : 0;

      return {
        totalReviews,
        averageRating,
        formattedReviews,
      };
    } catch (error) {
      console.error("Error fetching App Store data:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch App Store review data",
      });
    }
  }
);
