<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button 
        variant="outline" 
        size="sm" 
        class="w-full justify-start"
        v-umami="{
          name: 'reviews_sheet_open',
          reviews_count: reviews.length,
          location: 'wallet_detail'
        }"
      >
        <Icon name="simple-icons:trustpilot" class="w-4 h-4 mr-2" />
        Read Reviews
      </Button>
    </SheetTrigger>
    <SheetContent
      :side="isDesktop ? 'right' : 'bottom'"
      class="h-[60vh] sm:h-[50vh] md:h-full md:w-[400px]"
    >
      <SheetHeader>
        <SheetTitle>What Users Say</SheetTitle>
        <SheetDescription>
          Read reviews and feedback from users across different platforms
        </SheetDescription>
      </SheetHeader>
      <div class="flex-1 overflow-y-auto py-4 px-4">
        <div class="space-y-3">
          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="flex items-center p-3 justify-between border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span class="text-sm">{{ review.name }}</span>
            </div>
            <Button variant="outline" size="sm" as-child>
              <NuxtLink 
                :to="review.link" 
                target="_blank"
                v-umami="{
                  name: 'review_link_click',
                  review_name: review.name,
                  review_link: review.link,
                  location: 'reviews_sheet'
                }"
              >
                <ExternalLink class="w-4 h-4 mr-2" />
                Visit
              </NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { ExternalLink } from "lucide-vue-next";

interface Props {
  reviews: Array<{
    name: string;
    link: string;
  }>;
}

defineProps<Props>();

const isDesktop = useMediaQuery("(min-width: 768px)");
</script>
