<template>
  <div class="min-h-screen bg-white dark:bg-dark-bg flex flex-col justify-between">
    <!-- Navigation Header -->
    <Header />

    <main class="flex-grow">
      <!-- Hero Section -->
      <Hero class="animate-fade-in-up" />

      <!-- How It Works Section -->
      <HowItWorks class="animate-fade-in-up-delay-1" />

      <!-- Features Section -->
      <FeaturesSection class="animate-fade-in-up-delay-2" />

      <!-- Templates Section -->
      <TemplatesShowcase class="animate-fade-in-up-delay-3" />

      <!-- AI Optimizer Section -->
      <AIOptimizerSection />

      <!-- ATS Checker Section -->
      <ATSCheckerSection />

      <!-- Job Matching Section -->
      <JobMatchingSection />

      <!-- Pricing Section -->
      <Pricing />

      <!-- FAQ Section -->
      <FAQSection />

      <!-- Testimonials Section -->
      <TestimonialsSection />

      <!-- Final CTA Section -->
      <FinalCTASection />

      <!-- Newsletter Section -->
      <NewsletterSection />
    </main>

    <!-- Marketing Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/public/Header.vue'
import Hero from '@/components/public/Hero.vue'
import HowItWorks from '@/components/public/HowItWorks.vue'
import FeaturesSection from '@/components/public/FeaturesSection.vue'
import TemplatesShowcase from '@/components/public/TemplatesShowcase.vue'
import AIOptimizerSection from '@/components/public/AIOptimizerSection.vue'
import ATSCheckerSection from '@/components/public/ATSCheckerSection.vue'
import JobMatchingSection from '@/components/public/JobMatchingSection.vue'
import Pricing from '@/components/public/Pricing.vue'
import FAQSection from '@/components/public/FAQSection.vue'
import TestimonialsSection from '@/components/public/TestimonialsSection.vue'
import FinalCTASection from '@/components/public/FinalCTASection.vue'
import NewsletterSection from '@/components/public/NewsletterSection.vue'
import Footer from '@/components/public/Footer.vue'
</script>
