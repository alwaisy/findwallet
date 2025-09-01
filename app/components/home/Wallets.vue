<template>
  <div class="space-y-8">
    <!-- Loading State -->
    <div v-if="pending" class="py-8 text-center text-muted-foreground">
      Loading wallets...
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="py-8 text-center">
      <div class="mb-4 text-destructive">Failed to load wallets.</div>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
        @click="$emit('refresh')"
      >
        Retry
      </button>
    </div>

    <!-- Wallet Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <HomeWallet
        v-for="wallet in wallets"
        :key="wallet.platform.slug"
        :wallet="wallet"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WalletPlatform } from "~/lib/schema";

// Props
interface Props {
  wallets?: WalletPlatform[];
  pending?: boolean;
  error?: Error | null;
}

withDefaults(defineProps<Props>(), {
  wallets: () => [],
  pending: false,
  error: null,
});

// Emits
defineEmits<{
  refresh: [];
}>();
</script>
