<template>
  <div class="min-h-screen bg-white dark:bg-dark-bg text-neutral-800 dark:text-neutral-200 font-ui flex flex-col justify-between">
    <Header />

    <main class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8 flex-grow">
      <div class="border-b border-neutral-200 dark:border-dark-border pb-6">
        <span class="text-xs font-bold uppercase tracking-wider text-brand-orange">Legal & Policy</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mt-1">Privacy Policy</h1>
        <p class="text-xs text-neutral-400 mt-2">Last Updated: October 2026</p>
      </div>

      <div class="space-y-6 text-sm leading-relaxed">
        <section class="space-y-2">
          <h2 class="text-lg font-bold text-neutral-900 dark:text-white">1. Information We Collect</h2>
          <p>CVForge collects information you provide directly to us when creating an account, authenticating through Google or GitHub OAuth, building resumes, or uploading PDF/DOCX documents for AI optimization.</p>
          <ul class="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-400">
            <li><strong>Account Data:</strong> Name, email address, profile avatar, authentication credentials.</li>
            <li><strong>CV Content:</strong> Work history, education credentials, skills, contact phone numbers, and portfolio links.</li>
            <li><strong>Uploaded Documents:</strong> Temporary storage for processing resume extracts via AI.</li>
          </ul>
        </section>

        <section class="space-y-2">
          <h2 class="text-lg font-bold text-neutral-900 dark:text-white">2. AI Processing & Providers</h2>
          <p>Resume content submitted for optimization is processed via serverless Google Gemini (primary provider) or OpenRouter (fallback). We do not use your proprietary CV text to train public AI models. Structured suggestions are generated in real-time and never overwrite your document without explicit user consent.</p>
        </section>

        <section class="space-y-2">
          <h2 class="text-lg font-bold text-neutral-900 dark:text-white">3. Payment & Security</h2>
          <p>Payments are securely handled by Paystack. CVForge never stores full card credentials, CVVs, or PINs on our servers. All transactions undergo server-side HMAC-SHA512 verification.</p>
        </section>

        <section class="space-y-2">
          <h2 class="text-lg font-bold text-neutral-900 dark:text-white">4. Your Data Ownership & Deletion</h2>
          <p>You retain full intellectual property ownership of the resumes you create on CVForge. You may export or permanently delete your resumes and account data at any time from your account settings.</p>
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
