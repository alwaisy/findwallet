<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <MessageSquare class="w-5 h-5" />
        Discussions
      </CardTitle>
      <CardDescription>
        Share your experience and ask questions about {{ wallet.platform.name }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="text-center py-8">
        <MessageSquare class="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 class="text-lg font-medium text-foreground mb-2">
          Discussions Coming Soon
        </h3>
        <p class="text-sm text-muted-foreground mb-4">
          I'm working on adding discussion features. Soon you'll be able to:
        </p>
        <ul class="text-sm text-muted-foreground space-y-1 mb-6">
          <li>• Share your experience with {{ wallet.platform.name }}</li>
          <li>• Ask questions about features and services</li>
          <li>• Get help from other users</li>
          <li>• Read reviews and ratings</li>
        </ul>
        <Button variant="outline" disabled>
          <Bell class="w-4 h-4 mr-2" />
          Notify me when available
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Bell, MessageSquare } from "lucide-vue-next";
import type { WalletPlatform } from "~/lib/schema";

interface Props {
  wallet: WalletPlatform;
}

defineProps<Props>();
</script>
