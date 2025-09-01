<template>
  <Card
    :class="[
      'group transition-all duration-300 border-border hover:ring hover:ring-ring',
      wallet.platform.onlyInternational
        ? 'bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200/60 dark:border-blue-800/60'
        : '',
    ]"
  >
    <CardHeader class="pb-4">
      <NuxtLink
        :to="`/w/${wallet.platform.slug}`"
        class="flex items-start justify-between"
        v-umami="{
          name: 'wallet_card_click',
          wallet_name: wallet.platform.name,
          wallet_slug: wallet.platform.slug,
          wallet_type: wallet.platform.essence,
          international_support: wallet.platform.international_support,
          only_international: wallet.platform.onlyInternational,
          source: 'homepage',
          location: 'wallet_card'
        }"
      >
        <div class="flex items-center gap-4">
          <!-- Wallet Logo -->
          <div
            :class="[
              'w-16 h-16 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-background border border-border relative',
              wallet.platform.onlyInternational
                ? 'ring-2 ring-blue-400/30 dark:ring-blue-600/40'
                : '',
            ]"
          >
            <!-- {{wallet.platform}} -->
            <img
              :src="wallet.platform.logo"
              :alt="wallet.platform.name"
              class="w-12 h-12 object-contain rounded-lg"
              loading="lazy"
            />
            <!-- International-only indicator -->
            <div
              v-if="wallet.platform.onlyInternational"
              class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm"
              :title="'International-only service'"
            >
              <Globe class="w-3 h-3 text-white" />
            </div>
          </div>

          <div class="flex-1">
            <CardTitle class="text-xl font-bold text-foreground">
              {{ wallet.platform.name }}
            </CardTitle>
            <div class="flex items-center gap-2 mt-1">
              <Badge variant="secondary" class="text-xs">
                {{ wallet.platform.founded }}
              </Badge>
              <Badge
                :variant="
                  wallet.platform.international_support ? 'default' : 'outline'
                "
                :class="[
                  'text-xs',
                  wallet.platform.onlyInternational
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-sm'
                    : '',
                ]"
              >
                <Globe class="w-3 h-3 mr-1" />
                {{
                  wallet.platform.onlyInternational
                    ? "International Only"
                    : wallet.platform.international_support
                      ? "International"
                      : "Local"
                }}
              </Badge>
              <Badge variant="outline" class="text-xs capitalize">
                {{ wallet.platform.essence }}
              </Badge>
            </div>
          </div>
        </div>

        <!-- Score Badge -->
        <div class="flex-shrink-0">
          <SharedScoreBadge
            :slug="wallet.platform.slug"
            :wallet-name="wallet.platform.name"
          />
        </div>
      </NuxtLink>
    </CardHeader>

            <NuxtLink 
          :to="`/w/${wallet.platform.slug}`"
          v-umami="{
            name: 'wallet_content_click',
            wallet_name: wallet.platform.name,
            wallet_slug: wallet.platform.slug,
            source: 'homepage',
            location: 'wallet_content'
          }"
        >
          <CardContent class="space-y-4">
        <!-- User Base -->
        <div
          :to="`/w/${wallet.platform.slug}`"
          class="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Users class="w-4 h-4" />
          <span>{{ wallet.platform.user_base }}</span>
        </div>

        <!-- Primary Use -->
        <div
          :to="`/w/${wallet.platform.slug}`"
          class="text-sm text-muted-foreground leading-relaxed"
        >
          {{ wallet.platform.primary_use }}
        </div>
      </CardContent>
    </NuxtLink>

    <CardFooter class="flex gap-2 pt-4">
      <Button
        v-if="wallet.platform.website"
        variant="outline"
        size="sm"
        class="hover:text-accent"
        as-child
      >
        <NuxtLink 
          :to="wallet.platform.website" 
          target="_blank"
          v-umami="{
            name: 'wallet_external_link_click',
            wallet_name: wallet.platform.name,
            wallet_slug: wallet.platform.slug,
            link_type: 'website',
            destination: wallet.platform.website,
            source: 'homepage'
          }"
        >
          <ExternalLink class="w-4 h-4 mr-2" />
          Website
        </NuxtLink>
      </Button>

      <Button
        v-if="wallet.platform.trustpilot_url"
        variant="ghost"
        size="icon"
        class="hover:bg-muted"
        :title="`Visit ${wallet.platform.name} Trustpilot`"
        as-child
      >
        <NuxtLink 
          :to="wallet.platform.trustpilot_url!" 
          target="_blank"
          v-umami="{
            name: 'wallet_external_link_click',
            wallet_name: wallet.platform.name,
            wallet_slug: wallet.platform.slug,
            link_type: 'trustpilot',
            destination: wallet.platform.trustpilot_url,
            source: 'homepage'
          }"
        >
          <Icon name="simple-icons:trustpilot" :size="18" />
        </NuxtLink>
      </Button>
      <Button
        v-if="wallet.platform.playstore_url"
        variant="ghost"
        size="icon"
        class="hover:bg-muted"
        :title="`Visit ${wallet.platform.name} Play Store`"
        as-child
      >
        <NuxtLink 
          :to="wallet.platform.playstore_url!" 
          target="_blank"
          v-umami="{
            name: 'wallet_external_link_click',
            wallet_name: wallet.platform.name,
            wallet_slug: wallet.platform.slug,
            link_type: 'playstore',
            destination: wallet.platform.playstore_url,
            source: 'homepage'
          }"
        >
          <Icon name="simple-icons:googleplay" :size="18" />
        </NuxtLink>
      </Button>
      <Button
        v-if="wallet.platform.appstore_url"
        variant="ghost"
        size="icon"
        class="hover:bg-muted"
        :title="`Visit ${wallet.platform.name} App Store`"
        as-child
      >
        <NuxtLink 
          :to="wallet.platform.appstore_url!" 
          target="_blank"
          v-umami="{
            name: 'wallet_external_link_click',
            wallet_name: wallet.platform.name,
            wallet_slug: wallet.platform.slug,
            link_type: 'appstore',
            destination: wallet.platform.appstore_url,
            source: 'homepage'
          }"
        >
          <Icon name="simple-icons:appstore" :size="18" />
        </NuxtLink>
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { ExternalLink, Globe, Users } from "lucide-vue-next";
import type { WalletPlatform } from "~/lib/schema";

interface Props {
  wallet: WalletPlatform;
}

defineProps<Props>();
</script>
