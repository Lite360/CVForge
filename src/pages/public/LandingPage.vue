<template>
  <div class="min-h-screen bg-white dark:bg-dark-bg flex flex-col justify-between">
    <!-- Navigation Header -->
    <Header />

    <main class="flex-grow">
      <!-- Hero Section -->
      <Hero />

      <!-- How It Works Section -->
      <HowItWorks />

      <!-- Pricing Section -->
      <Pricing />
    </main>

    <!-- Marketing Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/public/Header.vue'
import Hero from '@/components/public/Hero.vue'
import HowItWorks from '@/components/public/HowItWorks.vue'
import Pricing from '@/components/public/Pricing.vue'
import Footer from '@/components/public/Footer.vue'
</script>
