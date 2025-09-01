<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button 
        variant="outline" 
        size="sm"
        v-umami="{
          name: 'further_readings_open',
          readings_count: furtherReadings.length,
          location: 'wallet_detail'
        }"
      >
        <BookOpen class="w-4 h-4 mr-2" />
        Further Reading
      </Button>
    </SheetTrigger>
    <SheetContent
      :side="isDesktop ? 'right' : 'bottom'"
      class="h-[60vh] sm:h-[50vh] md:h-full md:w-[400px]"
    >
      <SheetHeader>
        <SheetTitle>Further Reading</SheetTitle>
        <SheetDescription>
          Additional resources and information about this platform
        </SheetDescription>
      </SheetHeader>
      <div class="flex-1 overflow-y-auto py-4 px-4">
        <div class="space-y-3">
          <div
            v-for="(reading, index) in furtherReadings"
            :key="index"
            class="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
              <span class="text-sm">{{ reading.name }}</span>
            </div>
            <Button variant="outline" size="sm" as-child>
              <NuxtLink 
                :to="reading.link" 
                target="_blank"
                v-umami="{
                  name: 'further_reading_link_click',
                  reading_name: reading.name,
                  reading_link: reading.link,
                  location: 'further_readings_sheet'
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
import { ExternalLink, BookOpen } from "lucide-vue-next";

interface Props {
  furtherReadings: Array<{
    name: string;
    link: string;
  }>;
}

defineProps<Props>();

const isDesktop = useMediaQuery("(min-width: 768px)");
</script>
