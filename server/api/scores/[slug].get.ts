import type { ScoreFetchResult } from "@/lib/types/scoring";
import { createError, defineEventHandler } from "h3";
import { ensureScoringSchema, scoringDb } from "../../utils/scoring-db";

export default defineEventHandler(async (event): Promise<ScoreFetchResult> => {
  try {
    await ensureScoringSchema();

    const slug = event.context.params?.slug;
    if (!slug) {
      throw createError({
        statusCode: 400,
        statusMessage: "Platform slug is required",
      });
    }

    const client = scoringDb();
    const result = await client.execute({
      sql: `SELECT 
        slug,
        total_score as totalScore,
        total_reviews as totalReviews,
        playstore_rating as playstoreRating,
        playstore_reviews as playstoreReviews,
        playstore_weight as playstoreWeight,
        appstore_rating as appstoreRating,
        appstore_reviews as appstoreReviews,
        appstore_weight as appstoreWeight,
        trustpilot_rating as trustpilotRating,
        trustpilot_reviews as trustpilotReviews,
        trustpilot_weight as trustpilotWeight,
        last_updated as lastUpdated
      FROM platform_scores 
      WHERE slug = ?1`,
      args: [slug],
    });

    if (result.rows.length === 0) {
      return {
        success: false,
        error: "Platform score not found",
      };
    }

    const row = result.rows[0];
    if (!row) {
      return {
        success: false,
        error: "Platform score not found",
      };
    }

    const score = {
      slug: row.slug as string,
      totalScore: Number(row.totalScore),
      totalReviews: Number(row.totalReviews),
      playstoreRating: row.playstoreRating
        ? Number(row.playstoreRating)
        : undefined,
      playstoreReviews: row.playstoreReviews
        ? Number(row.playstoreReviews)
        : undefined,
      playstoreWeight: row.playstoreWeight
        ? Number(row.playstoreWeight)
        : undefined,
      appstoreRating: row.appstoreRating
        ? Number(row.appstoreRating)
        : undefined,
      appstoreReviews: row.appstoreReviews
        ? Number(row.appstoreReviews)
        : undefined,
      appstoreWeight: row.appstoreWeight
        ? Number(row.appstoreWeight)
        : undefined,
      trustpilotRating: row.trustpilotRating
        ? Number(row.trustpilotRating)
        : undefined,
      trustpilotReviews: row.trustpilotReviews
        ? Number(row.trustpilotReviews)
        : undefined,
      trustpilotWeight: row.trustpilotWeight
        ? Number(row.trustpilotWeight)
        : undefined,
      lastUpdated: Number(row.lastUpdated),
    };

    return {
      success: true,
      data: score,
    };
  } catch (error) {
    console.error("Error fetching platform score:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
});
