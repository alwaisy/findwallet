import type { TrustpilotReviewData } from "@/lib/types/reviews";

export default defineEventHandler(
  async (event): Promise<TrustpilotReviewData> => {
    const query = getQuery(event);
    const url = query.url as string;

    if (!url) {
      throw createError({
        statusCode: 400,
        statusMessage: "URL parameter is required",
      });
    }

    try {
      // Fetch the Trustpilot page
      const response = await $fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });

      const html = response as string;

      // Target the business-unit-title section which contains the main company info
      const businessUnitMatch = html.match(
        /id="business-unit-title"[^>]*>.*?Reviews[^>]*<!-- -->[^>]*<!-- -->(\d+(?:,\d+)*)/is
      );
      let totalReviews = 0;
      if (businessUnitMatch && businessUnitMatch[1]) {
        totalReviews = parseInt(businessUnitMatch[1].replace(/,/g, ""));
      }

      // Target the rating within the business-unit-title section using stable attributes
      const ratingMatch = html.match(
        /id="business-unit-title"[^>]*>.*?data-rating-typography="true"[^>]*>(\d+(?:\.\d+)?)/is
      );

      const averageRating =
        ratingMatch && ratingMatch[1] ? parseFloat(ratingMatch[1]) : 0;

      return {
        totalReviews,
        averageRating,
      };
    } catch (error) {
      console.error("Error fetching Trustpilot data:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch Trustpilot review data",
      });
    }
  }
);
