<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Quick Actions -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <MousePointer class="w-5 h-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          <Button
            v-if="wallet.platform.website"
            variant="outline"
            class="w-full justify-start"
            as-child
          >
            <NuxtLink :to="wallet.platform.website" target="_blank">
              <ExternalLink class="w-4 h-4 mr-2" />
              Visit Website
            </NuxtLink>
          </Button>

          <div class="grid grid-cols-2 gap-2">
            <Button
              v-if="wallet.platform.playstore_url"
              variant="outline"
              size="sm"
              class="flex flex-col items-center gap-1 h-auto py-3"
              as-child
            >
              <NuxtLink :to="wallet.platform.playstore_url" target="_blank">
                <Icon name="simple-icons:googleplay" class="w-4 h-4" />
                <span class="text-xs">Play Store</span>
              </NuxtLink>
            </Button>

            <Button
              v-if="wallet.platform.appstore_url"
              variant="outline"
              size="sm"
              class="flex flex-col items-center gap-1 h-auto py-3"
              as-child
            >
              <NuxtLink :to="wallet.platform.appstore_url" target="_blank">
                <Icon name="simple-icons:appstore" class="w-4 h-4" />
                <span class="text-xs">App Store</span>
              </NuxtLink>
            </Button>
          </div>

          <!-- Trustpilot Reviews Button -->
          <Button
            v-if="wallet.platform.trustpilot_url"
            variant="outline"
            size="sm"
            class="w-full justify-start"
            as-child
          >
            <NuxtLink :to="wallet.platform.trustpilot_url" target="_blank">
              <Icon name="simple-icons:trustpilot" class="w-4 h-4 mr-2" />
              Read Reviews
            </NuxtLink>
          </Button>

          <!-- External Reviews Sheet (when no trustpilot but has review links) -->
          <WalletReviewsSheet
            v-else-if="
              wallet.content.reviews && wallet.content.reviews.length > 0
            "
            :reviews="wallet.content.reviews"
          />
        </div>
      </CardContent>
      <CardFooter>
        <div class="flex justify-between items-center w-full">
          <WalletSourcesDialog :sources="wallet.sources || []" />
          <WalletFurtherReadingsSheet
            v-if="
              wallet.content.further_reading &&
              wallet.content.further_reading.length > 0
            "
            :further-readings="wallet.content.further_reading"
          />
        </div>
      </CardFooter>
    </Card>

    <!-- Important Notes -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <AlertCircle class="w-5 h-5" />
          Important Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul class="">
          <li
            v-for="(note, index) in wallet.content.important_notes"
            :key="index"
            class="flex items-center gap-3 p-1 bg-muted/30 rounded-lg"
          >
            <div class="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
            <span class="text-sm text-muted-foreground mt-1">{{ note }}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { AlertCircle, ExternalLink, MousePointer } from "lucide-vue-next";
import type { WalletPlatform } from "~/lib/schema";

interface Props {
  wallet: WalletPlatform;
}

defineProps<Props>();
</script>
