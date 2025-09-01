<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button 
        variant="outline" 
        size="sm" 
        class="gap-2"
        v-umami="{
          name: 'sources_dialog_open',
          sources_count: sources.length,
          location: 'wallet_detail'
        }"
      >
        <ExternalLink class="w-4 h-4" />
        View Sources
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Sources & References</DialogTitle>
        <DialogDescription>
          Official sources and references used for this information.
        </DialogDescription>
      </DialogHeader>
      <div class="space-y-3">
        <div
          v-if="sources.length === 0"
          class="text-center text-muted-foreground py-4"
        >
          No sources available
        </div>
        <div v-else class="space-y-2">
          <div
            v-for="(source, index) in sources"
            :key="index"
            class="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
          >
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium truncate">
                {{ getSourceTitle(source) }}
              </p>
              <!-- <p class="text-xs text-muted-foreground truncate">
                {{ source }}
              </p> -->
            </div>
            <Button
              variant="ghost"
              size="sm"
              class="ml-2"
              @click="openSource(source)"
              v-umami="{
                name: 'source_link_click',
                source_title: getSourceTitle(source),
                source_url: source,
                location: 'sources_dialog'
              }"
            >
              <ExternalLink class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="closeDialog"> Close </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ExternalLink } from "lucide-vue-next";

interface Props {
  sources: string[];
}

defineProps<Props>();

function getSourceTitle(url: string): string {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    if (domain.includes("play.google.com")) return "Google Play Store";
    if (domain.includes("apps.apple.com")) return "Apple App Store";
    if (domain.includes("trustpilot.com")) return "Trustpilot";
    if (domain.includes("linkedin.com")) return "LinkedIn";
    if (domain.includes("twitter.com") || domain.includes("x.com"))
      return "Twitter/X";
    if (domain.includes("facebook.com")) return "Facebook";
    if (domain.includes("instagram.com")) return "Instagram";
    if (domain.includes("youtube.com")) return "YouTube";
    if (domain.includes("medium.com")) return "Medium";
    if (domain.includes("techcrunch.com")) return "TechCrunch";
    if (domain.includes("reuters.com")) return "Reuters";
    if (domain.includes("bloomberg.com")) return "Bloomberg";
    if (domain.includes("wsj.com")) return "Wall Street Journal";
    if (domain.includes("cnbc.com")) return "CNBC";
    if (domain.includes("forbes.com")) return "Forbes";
    if (domain.includes("businessinsider.com")) return "Business Insider";
    if (domain.includes("venturebeat.com")) return "VentureBeat";
    if (domain.includes("zdnet.com")) return "ZDNet";
    if (domain.includes("wired.com")) return "Wired";
    if (domain.includes("theverge.com")) return "The Verge";
    if (domain.includes("arstechnica.com")) return "Ars Technica";
    if (domain.includes("engadget.com")) return "Engadget";
    if (domain.includes("gizmodo.com")) return "Gizmodo";
    if (domain.includes("mashable.com")) return "Mashable";
    if (domain.includes("readwrite.com")) return "ReadWrite";
    if (domain.includes("thenextweb.com")) return "The Next Web";
    if (domain.includes("techradar.com")) return "TechRadar";
    if (domain.includes("digitaltrends.com")) return "Digital Trends";
    if (domain.includes("pcmag.com")) return "PC Magazine";
    if (domain.includes("tomshardware.com")) return "Tom's Hardware";
    if (domain.includes("anandtech.com")) return "AnandTech";
    if (domain.includes("gsmarena.com")) return "GSMArena";
    if (domain.includes("phonearena.com")) return "PhoneArena";
    if (domain.includes("androidcentral.com")) return "Android Central";
    if (domain.includes("9to5google.com")) return "9to5Google";
    if (domain.includes("9to5mac.com")) return "9to5Mac";
    if (domain.includes("macrumors.com")) return "MacRumors";
    if (domain.includes("theinformation.com")) return "The Information";
    if (domain.includes("protocol.com")) return "Protocol";
    if (domain.includes("axios.com")) return "Axios";
    if (domain.includes("vox.com")) return "Vox";
    if (domain.includes("theatlantic.com")) return "The Atlantic";
    if (domain.includes("newyorker.com")) return "The New Yorker";
    if (domain.includes("economist.com")) return "The Economist";
    if (domain.includes("ft.com")) return "Financial Times";
    if (domain.includes("nytimes.com")) return "The New York Times";
    if (domain.includes("washingtonpost.com")) return "The Washington Post";
    if (domain.includes("latimes.com")) return "Los Angeles Times";
    if (domain.includes("chicagotribune.com")) return "Chicago Tribune";
    if (domain.includes("bostonglobe.com")) return "The Boston Globe";
    if (domain.includes("sfgate.com")) return "San Francisco Chronicle";
    if (domain.includes("seattletimes.com")) return "The Seattle Times";
    if (domain.includes("dallasnews.com")) return "The Dallas Morning News";
    if (domain.includes("houstonchronicle.com")) return "Houston Chronicle";
    if (domain.includes("miamiherald.com")) return "Miami Herald";
    if (domain.includes("orlandosentinel.com")) return "Orlando Sentinel";
    if (domain.includes("tampabay.com")) return "Tampa Bay Times";
    if (domain.includes("ajc.com")) return "The Atlanta Journal-Constitution";
    if (domain.includes("charlotteobserver.com"))
      return "The Charlotte Observer";
    if (domain.includes("newsobserver.com")) return "The News & Observer";
    if (domain.includes("tampabay.com")) return "Tampa Bay Times";
    if (domain.includes("miamiherald.com")) return "Miami Herald";
    if (domain.includes("orlandosentinel.com")) return "Orlando Sentinel";
    if (domain.includes("houstonchronicle.com")) return "Houston Chronicle";
    if (domain.includes("dallasnews.com")) return "The Dallas Morning News";
    if (domain.includes("seattletimes.com")) return "The Seattle Times";
    if (domain.includes("sfgate.com")) return "San Francisco Chronicle";
    if (domain.includes("bostonglobe.com")) return "The Boston Globe";
    if (domain.includes("chicagotribune.com")) return "Chicago Tribune";
    if (domain.includes("latimes.com")) return "Los Angeles Times";
    if (domain.includes("washingtonpost.com")) return "The Washington Post";
    if (domain.includes("nytimes.com")) return "The New York Times";
    if (domain.includes("ft.com")) return "Financial Times";
    if (domain.includes("economist.com")) return "The Economist";
    if (domain.includes("newyorker.com")) return "The New Yorker";
    if (domain.includes("theatlantic.com")) return "The Atlantic";
    if (domain.includes("vox.com")) return "Vox";
    if (domain.includes("axios.com")) return "Axios";
    if (domain.includes("protocol.com")) return "Protocol";
    if (domain.includes("theinformation.com")) return "The Information";
    if (domain.includes("macrumors.com")) return "MacRumors";
    if (domain.includes("9to5mac.com")) return "9to5Mac";
    if (domain.includes("9to5google.com")) return "9to5Google";
    if (domain.includes("androidcentral.com")) return "Android Central";
    if (domain.includes("phonearena.com")) return "PhoneArena";
    if (domain.includes("gsmarena.com")) return "GSMArena";
    if (domain.includes("anandtech.com")) return "AnandTech";
    if (domain.includes("tomshardware.com")) return "Tom's Hardware";
    if (domain.includes("pcmag.com")) return "PC Magazine";
    if (domain.includes("digitaltrends.com")) return "Digital Trends";
    if (domain.includes("techradar.com")) return "TechRadar";
    if (domain.includes("thenextweb.com")) return "The Next Web";
    if (domain.includes("readwrite.com")) return "ReadWrite";
    if (domain.includes("mashable.com")) return "Mashable";
    if (domain.includes("gizmodo.com")) return "Gizmodo";
    if (domain.includes("engadget.com")) return "Engadget";
    if (domain.includes("arstechnica.com")) return "Ars Technica";
    if (domain.includes("theverge.com")) return "The Verge";
    if (domain.includes("wired.com")) return "Wired";
    if (domain.includes("zdnet.com")) return "ZDNet";
    if (domain.includes("venturebeat.com")) return "VentureBeat";
    if (domain.includes("businessinsider.com")) return "Business Insider";
    if (domain.includes("forbes.com")) return "Forbes";
    if (domain.includes("cnbc.com")) return "CNBC";
    if (domain.includes("wsj.com")) return "Wall Street Journal";
    if (domain.includes("bloomberg.com")) return "Bloomberg";
    if (domain.includes("reuters.com")) return "Reuters";
    if (domain.includes("techcrunch.com")) return "TechCrunch";
    if (domain.includes("medium.com")) return "Medium";
    if (domain.includes("youtube.com")) return "YouTube";
    if (domain.includes("instagram.com")) return "Instagram";
    if (domain.includes("facebook.com")) return "Facebook";
    if (domain.includes("twitter.com") || domain.includes("x.com"))
      return "Twitter/X";
    if (domain.includes("linkedin.com")) return "LinkedIn";
    if (domain.includes("trustpilot.com")) return "Trustpilot";
    if (domain.includes("apps.apple.com")) return "Apple App Store";
    if (domain.includes("play.google.com")) return "Google Play Store";
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  } catch {
    return "Unknown Source";
  }
}

function openSource(url: string): void {
  window.open(url, "_blank", "noopener,noreferrer");
}

function closeDialog(): void {
  // Dialog will close automatically when clicking outside or close button
}
</script>
