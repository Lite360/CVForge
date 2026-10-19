<template>
  <div class="min-h-screen bg-white dark:bg-dark-bg text-neutral-800 dark:text-neutral-200 font-ui flex flex-col justify-between">
    <Header />

    <main class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8 flex-grow">
      <div class="border-b border-neutral-200 dark:border-dark-border pb-6">
        <span class="text-xs font-bold uppercase tracking-wider text-brand-orange">Legal & Terms</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mt-1">Terms & Conditions</h1>
        <p class="text-xs text-neutral-400 mt-2">Effective: October 2026</p>
      </div>

      <div class="space-y-6 text-sm leading-relaxed">
        <section class="space-y-2">
          <h2 class="text-lg font-bold text-neutral-900 dark:text-white">1. Service Scope & Warranties</h2>
          <p>CVForge provides professional CV creation, ATS compatibility scoring, job tailoring, and AI writing assistance. <strong>CVForge does not guarantee employment, interviews, job offers, or specific ATS passage rates</strong>. Resume content quality and factual accuracy remain the sole responsibility of the user.</p>
        </section>

        <section class="space-y-2">
          <h2 class="text-lg font-bold text-neutral-900 dark:text-white">2. Acceptable Use Policy</h2>
          <p>Users must provide accurate information and refrain from uploading malicious files, falsifying certifications, violating third-party copyrights, or abusing serverless AI quota limits.</p>
        </section>

        <section class="space-y-2">
          <h2 class="text-lg font-bold text-neutral-900 dark:text-white">3. Subscriptions & Billing</h2>
          <p>Paid premium features, including unlimited AI optimizations and premium templates, are billed according to chosen intervals (Monthly or Yearly) via Paystack. You may cancel subscriptions at any time from your account dashboard.</p>
        </section>

        <section class="space-y-2">
          <h2 class="text-lg font-bold text-neutral-900 dark:text-white">4. Attribution & Credits</h2>
          <p>CVForge is proudly designed and developed by <strong>Elite Developers</strong>. All rights reserved.</p>
        </section>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/public/Header.vue'
import Footer from '@/components/public/Footer.vue'
</script>
