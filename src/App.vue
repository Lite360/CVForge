<template>
  <div class="min-h-screen bg-white dark:bg-dark-bg text-neutral-900 dark:text-neutral-100 font-ui">
    <router-view />
    <PWAInstallPrompt />
  </div>
</template>

<script setup lang="ts">
import PWAInstallPrompt from '@/components/PWAInstallPrompt.vue'
</script>

