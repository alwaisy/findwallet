export interface ReviewData {
  totalReviews: number;
  averageRating: number;
}

export type TrustpilotReviewData = ReviewData;
export interface PlayStoreReviewData extends ReviewData {
  formattedReviews: string;
}
export interface AppStoreReviewData extends ReviewData {
  formattedReviews: string;
}
