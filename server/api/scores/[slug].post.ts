import type {
  ScoreCalculationInput,
  ScoreCalculationResult,
} from "@/lib/types/scoring";
import { createError, defineEventHandler, readBody } from "h3";
import { calculatePlatformScore } from "~/lib/utils/scoring-calculator";
import { batchLogger } from "../../utils/logger";
import { ensureScoringSchema, scoringDb } from "../../utils/scoring-db";

export default defineEventHandler(
  async (event): Promise<ScoreCalculationResult> => {
    try {
      await ensureScoringSchema();

      const slug = event.context.params?.slug;
      if (!slug) {
        throw createError({
          statusCode: 400,
          statusMessage: "Platform slug is required",
        });
      }

      const body = (await readBody(event)) as ScoreCalculationInput;

      // Validate input
      if (!body.urls || Object.keys(body.urls).length === 0) {
        return {
          success: false,
          error:
            "At least one URL (trustpilot, playstore, or appstore) is required",
          sources: {},
        };
      }

      // Calculate the platform score
      const score = await calculatePlatformScore(slug, body.urls, batchLogger);

      // Store in database
      const client = scoringDb();
      await client.execute({
        sql: `INSERT OR REPLACE INTO platform_scores (
          slug,
          total_score,
          total_reviews,
          playstore_rating,
          playstore_reviews,
          playstore_weight,
          appstore_rating,
          appstore_reviews,
          appstore_weight,
          trustpilot_rating,
          trustpilot_reviews,
          trustpilot_weight,
          last_updated
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          score.slug,
          score.totalScore,
          score.totalReviews,
          score.playstoreRating || null,
          score.playstoreReviews || null,
          score.playstoreWeight || null,
          score.appstoreRating || null,
          score.appstoreReviews || null,
          score.appstoreWeight || null,
          score.trustpilotRating || null,
          score.trustpilotReviews || null,
          score.trustpilotWeight || null,
          score.lastUpdated,
        ],
      });

      return {
        success: true,
        data: score,
        sources: {},
      };
    } catch (error) {
      console.error("Error calculating and storing platform score:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        sources: {},
      };
    }
  }
);
