<template>
  <div class="min-h-screen bg-background py-16 space-y-16">
    <!-- Hero Section -->
    <ClientOnly>
      <HomeHero />
    </ClientOnly>

    <!-- Wallets Section -->
    <section class="" data-section="wallets">
      <HomeWallets
        :wallets="wallets"
        :pending="pending"
        :error="error"
        @refresh="refresh()"
      />
    </section>

    <!-- Stats Section -->
    <ClientOnly>
      <HomeStats :wallets="wallets" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { fetchWallets } from "~/composables/use-wallets";

// Fetch all wallets from Nuxt Content with SSR
const {
  data: wallets,
  pending,
  error,
  refresh,
} = await useAsyncData("wallets:all", () => fetchWallets(), {
  server: true,
  default: () => [],
});

// Set page title and meta
useHead({
  title: "Pakistani Digital Wallets - FindWallet.pk",
  meta: [
    {
      name: "description",
      content:
        "Discover Pakistan's leading digital payment platforms including JazzCash, EasyPaisa, HBL Konnect, UBL Omni, and SadaPay.",
    },
  ],
});
</script>
