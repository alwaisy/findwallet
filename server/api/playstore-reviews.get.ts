import type { PlayStoreReviewData } from "@/lib/types/reviews";

export default defineEventHandler(
  async (event): Promise<PlayStoreReviewData> => {
    const query = getQuery(event);
    const url = query.url as string;

    if (!url) {
      throw createError({
        statusCode: 400,
        statusMessage: "URL parameter is required",
      });
    }

    try {
      // Fetch the Google Play Store page
      const response = await $fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });

      const html = response as string;

      // Extract total reviews count - handle M (millions) and K (thousands)
      const totalReviewsMatch = html.match(/(\d+(?:\.\d+)?[MK]?)\s*reviews?/i);
      let totalReviews = 0;
      let formattedReviews = "0";
      if (totalReviewsMatch && totalReviewsMatch[1]) {
        const match = totalReviewsMatch[1];
        formattedReviews = match;
        if (match && match.includes("M")) {
          // Convert millions to actual number
          const number = parseFloat(match.replace("M", ""));
          totalReviews = Math.round(number * 1000000);
        } else if (match && match.includes("K")) {
          // Convert thousands to actual number
          const number = parseFloat(match.replace("K", ""));
          totalReviews = Math.round(number * 1000);
        } else if (match) {
          // Regular number
          totalReviews = parseInt(match.replace(/,/g, ""));
        }
      }

      // Extract average rating
      const ratingMatch =
        html.match(/(\d+\.\d+)\s*_star_/i) || html.match(/(\d+\.\d+)\s*star/i);
      const averageRating =
        ratingMatch && ratingMatch[1] ? parseFloat(ratingMatch[1]) : 0;

      return {
        totalReviews,
        averageRating,
        formattedReviews,
      };
    } catch (error) {
      console.error("Error fetching Play Store data:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch Play Store review data",
      });
    }
  }
);
