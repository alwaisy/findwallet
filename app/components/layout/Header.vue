<template>
  <header
    class="bg-background/60 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-sm"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center" title="FindWallet">
          <SharedLogo />
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink
            v-for="link in navigationLinks"
            :key="link.path"
            :to="link.path"
            class="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-foreground bg-accent"
            v-umami="{
              name: 'navbar_navigation',
              link: link.label,
              destination: link.path,
              location: 'navbar',
              device: 'desktop'
            }"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
const navigationLinks = [
  // { path: '/platforms', label: 'Platforms' },
  // { path: '/compare', label: 'Compare' },
  // { path: "/about", label: "About" },
];
</script>
