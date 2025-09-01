<template>
  <HoverCard v-if="scoreData?.success && scoreData.data">
    <HoverCardTrigger as-child>
      <Badge
        :class="[
          'cursor-pointer transition-all hover:scale-105',
          getScoreColorClass(scoreData.data.totalScore),
        ]"
        variant="secondary"
        v-umami="{
          name: 'score_badge_hover',
          wallet_name: walletName,
          wallet_slug: slug,
          score: scoreData.data.totalScore,
          total_reviews: scoreData.data.totalReviews,
          location: 'score_badge'
        }"
      >
        <div class="flex items-center gap-1">
          <Star class="w-3 h-3 fill-current" />
          <span class="font-semibold">{{ scoreData.data.totalScore }}</span>
        </div>
      </Badge>
    </HoverCardTrigger>

    <HoverCardContent class="w-80 p-4">
      <div class="space-y-4">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <h4 class="font-semibold text-lg">{{ walletName }} Score</h4>
          <Badge
            :class="getScoreColorClass(scoreData?.data?.totalScore || 0)"
            variant="secondary"
          >
            {{ scoreData?.data?.totalScore || "--" }}/100
          </Badge>
        </div>

        <!-- Total Reviews -->
        <div class="text-sm text-muted-foreground">
          Based on {{ formatNumber(scoreData?.data?.totalReviews || 0) }} total
          reviews
        </div>

        <!-- Score Breakdown -->
        <div class="space-y-3">
          <h5 class="font-medium text-sm">Score Breakdown</h5>

          <!-- Play Store -->
          <div
            v-if="scoreData?.data?.playstoreRating"
            class="flex items-center justify-between p-2 bg-muted/50 rounded-md"
          >
            <div class="flex items-center gap-2">
              <Icon name="simple-icons:googleplay" class="w-4 h-4" />
              <span class="text-sm font-medium">Play Store</span>
            </div>
            <div class="text-right">
              <div class="flex items-center gap-1">
                <Star class="w-3 h-3 fill-yellow-400" />
                <span class="text-sm font-medium"
                  >{{ scoreData.data.playstoreRating }}/5</span
                >
              </div>
              <div class="text-xs text-muted-foreground">
                {{ formatNumber(scoreData.data.playstoreReviews || 0) }} reviews
                <span class="text-primary"
                  >({{
                    formatPercentage(scoreData.data.playstoreWeight || 0)
                  }})</span
                >
              </div>
            </div>
          </div>

          <!-- App Store -->
          <div
            v-if="scoreData?.data?.appstoreRating"
            class="flex items-center justify-between p-2 bg-muted/50 rounded-md"
          >
            <div class="flex items-center gap-2">
              <Icon name="simple-icons:appstore" class="w-4 h-4" />
              <span class="text-sm font-medium">App Store</span>
            </div>
            <div class="text-right">
              <div class="flex items-center gap-1">
                <Star class="w-3 h-3 fill-yellow-400" />
                <span class="text-sm font-medium"
                  >{{ scoreData.data.appstoreRating }}/5</span
                >
              </div>
              <div class="text-xs text-muted-foreground">
                {{ formatNumber(scoreData.data.appstoreReviews || 0) }} reviews
                <span class="text-primary"
                  >({{
                    formatPercentage(scoreData.data.appstoreWeight || 0)
                  }})</span
                >
              </div>
            </div>
          </div>

          <!-- Trustpilot -->
          <div
            v-if="scoreData?.data?.trustpilotRating"
            class="flex items-center justify-between p-2 bg-muted/50 rounded-md"
          >
            <div class="flex items-center gap-2">
              <Icon name="simple-icons:trustpilot" class="w-4 h-4" />
              <span class="text-sm font-medium">Trustpilot</span>
            </div>
            <div class="text-right">
              <div class="flex items-center gap-1">
                <Star class="w-3 h-3 fill-yellow-400" />
                <span class="text-sm font-medium"
                  >{{ scoreData.data.trustpilotRating }}/5</span
                >
              </div>
              <div class="text-xs text-muted-foreground">
                {{ formatNumber(scoreData.data.trustpilotReviews || 0) }}
                reviews
                <span class="text-primary"
                  >({{
                    formatPercentage(scoreData.data.trustpilotWeight || 0)
                  }})</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Last Updated -->
        <div class="text-xs text-muted-foreground border-t pt-2">
          Last updated: {{ formatDate(scoreData?.data?.lastUpdated || 0) }}
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>

<script setup lang="ts">
import type { PlatformScore } from "@/lib/types/scoring";
import { Star } from "lucide-vue-next";

interface Props {
  slug: string;
  walletName: string;
}

const props = defineProps<Props>();

// Fetch score data using Nuxt's useFetch
const { data: scoreData } = await useFetch<{
  success: boolean;
  data?: PlatformScore;
  error?: string;
}>(`/api/scores/${props.slug}`);

// Score color classes based on rating with better dark mode support
function getScoreColorClass(score: number): string {
  if (score >= 80)
    return "bg-green-500/10 text-green-700 hover:bg-green-500/20 dark:bg-green-500/20 dark:text-green-400";
  if (score >= 60)
    return "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20 dark:bg-yellow-500/20 dark:text-yellow-400";
  if (score >= 40)
    return "bg-orange-500/10 text-orange-700 hover:bg-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400";
  return "bg-red-500/15 text-red-600 hover:bg-red-500/25 dark:bg-red-500/25 dark:text-red-400 dark:hover:bg-red-500/35";
}

// Format large numbers
function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

// Format percentage
function formatPercentage(weight: number): string {
  return `${(weight * 100).toFixed(1)}%`;
}

// Format date
function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString();
}
</script>
