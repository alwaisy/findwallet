<script setup lang="ts">
interface Props {
  to?: string;
  showText?: boolean;
  text?: string;
  size?: number; // pixels for icon box (square)
}

const props = withDefaults(defineProps<Props>(), {
  to: "/",
  showText: true,
  text: "FindWallet",
  size: 32,
});
</script>

<template>
  <NuxtLink
    :to="props.to"
    class="inline-flex items-center gap-2"
    aria-label="Home"
  >
    <!-- Icon container -->
    <div
      class="shrink-0 rounded-md border border-border bg-primary flex items-center justify-center"
      :style="{ width: `${props.size}px`, height: `${props.size}px` }"
    >
      <Icon
        name="lucide:wallet"
        :class="`text-primary-foreground`"
        :style="{
          width: `${props.size * 0.625}px`,
          height: `${props.size * 0.625}px`,
        }"
      />
    </div>
    <p
      v-if="props.showText"
      class="font-semibold tracking-wider"
      :title="props.text"
    >
      {{ props.text }}
    </p>
  </NuxtLink>
</template>
