<template>
  <Card>
    <CardHeader>
      <CardTitle>About {{ wallet.platform.name }}</CardTitle>
    </CardHeader>
    <CardContent>
      <p class="text-muted-foreground leading-relaxed mb-6">
        {{ wallet.content.about }}
      </p>

      <!-- Stats as part of about text -->
      <div class="space-y-4 text-sm text-muted-foreground">
        <div class="flex flex-col sm:flex-row sm:items-center gap-2">
          <span class="font-medium text-foreground">User Base:</span>
          <span>{{ wallet.platform.user_base }}</span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center gap-2">
          <span class="font-medium text-foreground">Founded:</span>
          <span>{{ wallet.platform.founded }}</span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center gap-2">
          <span class="font-medium text-foreground">Headquarters:</span>
          <span>{{ wallet.platform.headquarters }}</span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center gap-2">
          <span class="font-medium text-foreground">Rating Score:</span>
          <SharedScoreBadge
            :slug="wallet.platform.slug"
            :wallet-name="wallet.platform.name"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { WalletPlatform } from "~/lib/schema";

interface Props {
  wallet: WalletPlatform;
}

defineProps<Props>();
</script>
