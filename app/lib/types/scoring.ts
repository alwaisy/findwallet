export interface PlatformScore {
  slug: string;
  totalScore: number;
  totalReviews: number;
  playstoreRating?: number;
  playstoreReviews?: number;
  playstoreWeight?: number;
  appstoreRating?: number;
  appstoreReviews?: number;
  appstoreWeight?: number;
  trustpilotRating?: number;
  trustpilotReviews?: number;
  trustpilotWeight?: number;
  lastUpdated: number;
}

export interface ScoreCalculationInput {
  slug: string;
  urls: {
    trustpilot?: string;
    playstore?: string;
    appstore?: string;
  };
}

export interface ScoreCalculationResult {
  success: boolean;
  data?: PlatformScore;
  error?: string;
  sources: {
    trustpilot?: { rating: number; reviews: number };
    playstore?: { rating: number; reviews: number };
    appstore?: { rating: number; reviews: number };
  };
}

export interface ScoreFetchResult {
  success: boolean;
  data?: PlatformScore;
  error?: string;
}
