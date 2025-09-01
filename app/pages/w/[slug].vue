<template>
  <div class="min-h-screen bg-background">
    <!-- Loading State -->
    <div v-if="pending" class="py-6">
      <div class="container mx-auto">
        <!-- Header Skeleton -->
        <div class="mb-6">
          <div class="flex items-center gap-4 mb-4">
            <Skeleton class="h-8 w-16" />
            <div class="flex items-center gap-3">
              <Skeleton class="w-12 h-12 rounded-lg" />
              <div>
                <Skeleton class="h-8 w-32 mb-2" />
                <Skeleton class="h-4 w-48" />
              </div>
            </div>
          </div>

          <!-- Quick Stats Row Skeleton -->
          <div class="flex items-center gap-4">
            <Skeleton class="h-4 w-24" />
            <Skeleton class="h-4 w-px" />
            <Skeleton class="h-4 w-20" />
            <Skeleton class="h-4 w-px" />
            <Skeleton class="h-4 w-28" />
            <Skeleton class="h-4 w-px" />
            <Skeleton class="h-6 w-16" />
          </div>
        </div>

        <!-- Tabs Skeleton -->
        <div class="mb-6">
          <div class="flex gap-2 mb-6">
            <Skeleton class="h-10 w-20" />
            <Skeleton class="h-10 w-20" />
            <Skeleton class="h-10 w-24" />
            <Skeleton class="h-10 w-24" />
          </div>
        </div>

        <!-- Content Skeleton -->
        <div class="space-y-6">
          <div class="space-y-4">
            <Skeleton class="h-6 w-32" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-3/4" />
            <Skeleton class="h-4 w-5/6" />
          </div>

          <div class="space-y-4">
            <Skeleton class="h-6 w-24" />
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Skeleton class="h-10 w-full" />
              <Skeleton class="h-10 w-full" />
              <Skeleton class="h-10 w-full" />
            </div>
          </div>

          <div class="space-y-4">
            <Skeleton class="h-6 w-28" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-5/6" />
              <Skeleton class="h-4 w-4/5" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-screen"
    >
      <div class="text-center space-y-4">
        <h1 class="text-2xl font-bold text-foreground">Wallet Not Found</h1>
        <p class="text-muted-foreground">
          The wallet you're looking for doesn't exist.
        </p>
        <Button as-child>
          <NuxtLink to="/">Go Back Home</NuxtLink>
        </Button>
      </div>
    </div>

    <!-- Wallet Content -->
    <div v-else-if="wallet" class="py-6">
      <div class="container mx-auto">
        <!-- Header -->
        <Button variant="ghost" size="sm" as-child>
          <NuxtLink 
            to="/"
            v-umami="{
              name: 'wallet_back_to_home',
              wallet_name: wallet.platform.name,
              wallet_slug: wallet.platform.slug,
              source: 'wallet_detail_page'
            }"
          >
            <ArrowLeft class="w-4 h-4 mr-2" />
            Back to Wallets
          </NuxtLink>
        </Button>
        <div class="my-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="flex items-center gap-3">
              <img
                :src="wallet.platform.logo"
                :alt="wallet.platform.name"
                class="w-12 h-12 object-contain rounded-lg border border-border"
              />
              <div>
                <h1 class="text-2xl font-bold text-foreground">
                  {{ wallet.platform.name }}
                </h1>
                <p class="text-sm text-muted-foreground">
                  {{ wallet.platform.primary_use }}
                </p>
              </div>
            </div>
          </div>

          <!-- Quick Stats Row -->
        </div>

        <!-- About Section -->
        <div class="mb-4">
          <WalletAbout :wallet="wallet" />
        </div>

        <!-- Quick Actions & Notes -->
        <div class="mb-4">
          <WalletQuickActions :wallet="wallet" />
        </div>

        <!-- Features & International Section -->
        <div class="mb-4">
          <WalletFeaturesAndInternational :wallet="wallet" />
        </div>

        <!-- Discussions Section -->
        <div class="mb-4">
          <WalletDiscussions :wallet="wallet" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";

// Get the slug from the route
const route = useRoute();
const slug = computed(() => route.params.slug as string);
const keyWallet = computed(() => `wallets:${slug.value}`);

// Fetch the wallet by slug from Nuxt Content with SSR
const {
  data: wallet,
  pending,
  error,
} = await useAsyncData(
  keyWallet.value,
  () => {
    return queryCollection("wallets").path(`/wallets/${slug.value}`).first();
  },
  { server: true }
);

// Handle 404 if wallet not found
if (!wallet.value && !pending.value) {
  console.log("Wallet not found", error.value);
  throw createError({ statusCode: 404, statusMessage: "Wallet not found" });
}

// Track page view with Umami when wallet is loaded
onMounted(() => {
  if (wallet.value) {
    umTrackView();
    umIdentify({
      page: 'wallet_detail',
      wallet_name: wallet.value.platform.name,
      wallet_slug: wallet.value.platform.slug,
      wallet_type: wallet.value.platform.essence,
      international_support: wallet.value.platform.international_support,
      user_type: 'visitor'
    });
  }
});

// Set page meta
useHead(() => ({
  title: wallet.value
    ? `${wallet.value.platform.name} - FindWallet.pk`
    : "Wallet Not Found",
  meta: [
    {
      name: "description",
      content: wallet.value
        ? `Learn about ${wallet.value.platform.name}, Pakistan's leading digital wallet. ${wallet.value.content.about.substring(0, 150)}...`
        : "Wallet not found",
    },
  ],
}));
</script>
