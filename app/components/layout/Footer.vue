<template>
  <footer class="bg-background border-t border-border">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div
        class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
      >
        <SharedLogo />
        <p class="text-muted-foreground text-xs">
          © {{ new Date().getFullYear() }} FindWallet PK. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
