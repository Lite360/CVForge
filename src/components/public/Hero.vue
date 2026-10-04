<template>
  <div class="relative overflow-hidden bg-gradient-to-b from-orange-50/50 to-white dark:from-dark-bg dark:to-dark-bg pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-neutral-100 dark:border-dark-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto space-y-6">
        
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-brand-orange/10 text-brand-orange dark:text-brand-orange-dark text-xs font-semibold tracking-wide">
          <Sparkles class="w-4 h-4" />
          <span>AI-POWERED CV BUILDER & OPTIMIZER</span>
        </div>

        <!-- Main Headline -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
          Create a Professional CV. <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-600">Optimize It With AI.</span> <br class="hidden sm:inline" />
          Get Job-Ready.
        </h1>

        <!-- Subheading -->
        <p class="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
          CVForge turns your experience into a tailored, recruiter-ready CV. Build from scratch or upload your existing document for AI optimization.
        </p>

        <!-- CTA Buttons -->
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link to="/dashboard" class="w-full sm:w-auto px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white text-base font-semibold rounded-xl shadow-lg shadow-orange-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2">
            <span>Create My CV</span>
            <ArrowRight class="w-5 h-5" />
          </router-link>
          <router-link to="/optimizer" class="w-full sm:w-auto px-8 py-4 border border-neutral-300 dark:border-dark-border text-neutral-800 dark:text-neutral-200 text-base font-semibold rounded-xl hover:bg-neutral-100 dark:hover:bg-dark-card transition-all flex items-center justify-center gap-2">
            <UploadCloud class="w-5 h-5 text-brand-orange" />
            <span>Optimize Existing CV</span>
          </router-link>
        </div>

        <!-- Trust Features -->
        <div class="pt-8 flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
          <div class="flex items-center gap-1.5">
            <CheckCircle2 class="w-4 h-4 text-emerald-500" />
            <span>ATS Friendly Templates</span>
          </div>
          <div class="flex items-center gap-1.5">
            <CheckCircle2 class="w-4 h-4 text-emerald-500" />
            <span>PDF & DOCX Export</span>
          </div>
          <div class="flex items-center gap-1.5">
            <CheckCircle2 class="w-4 h-4 text-emerald-500" />
            <span>Ayo AI Powered</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sparkles, ArrowRight, UploadCloud, CheckCircle2 } from 'lucide-vue-next'
</script>
