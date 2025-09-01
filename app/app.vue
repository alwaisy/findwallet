<script setup lang="ts">
useHead({
  htmlAttrs: { class: "dark" },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  <NuxtLoadingIndicator color="#3a5ba0" :height="8" />
  </NuxtLayout>
</template>
