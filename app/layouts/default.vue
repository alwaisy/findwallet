<template>
  <div class="min-h-screen flex flex-col">
    <LayoutHeader />
    <main class="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
