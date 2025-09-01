<template>
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="text-center p-6 bg-muted/50 rounded-lg border border-border">
      <Users class="w-8 h-8 mx-auto mb-3 text-primary" />
      <h3 class="text-xl font-bold text-foreground">
        {{ stats.totalUsers }} Users
      </h3>
      <p class="text-muted-foreground">Combined user base</p>
    </div>
    <div class="text-center p-6 bg-muted/50 rounded-lg border border-border">
      <Globe class="w-8 h-8 mx-auto mb-3 text-secondary" />
      <h3 class="text-xl font-bold text-foreground">
        {{ stats.totalPlatforms }} Platforms
      </h3>
      <p class="text-muted-foreground">Leading digital wallets</p>
    </div>
    <div class="text-center p-6 bg-muted/50 rounded-lg border border-border">
      <Shield class="w-8 h-8 mx-auto mb-3 text-accent" />
      <h3 class="text-xl font-bold text-foreground">
        {{ stats.internationalPlatforms }} International
      </h3>
      <p class="text-muted-foreground">Cross-border services</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Globe, Shield, Users } from "lucide-vue-next";
import type { WalletPlatform } from "~/lib/schema";
import { calculateWalletStats } from "~/lib/utils/stats-calculator";

interface Props {
  wallets?: WalletPlatform[];
}

const props = withDefaults(defineProps<Props>(), {
  wallets: () => [],
});

// Calculate dynamic stats
const stats = computed(() => calculateWalletStats(props.wallets));
</script>
