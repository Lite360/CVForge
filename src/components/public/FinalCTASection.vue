<template>
  <section class="py-24 bg-neutral-900 dark:bg-neutral-950 border-b border-neutral-800">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
      
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold tracking-wide">
        <Rocket class="w-3.5 h-3.5" />
        GET STARTED TODAY
      </div>

      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
        Ready to Build a CV <br class="hidden sm:inline" />
        That Gets You Hired?
      </h2>

      <p class="text-neutral-400 max-w-xl mx-auto leading-relaxed">
        Join thousands of job seekers using CVForge to create professional, ATS-optimized CVs. 
        Start for free — no credit card required.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <router-link 
          to="/register" 
          class="w-full sm:w-auto px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white text-base font-semibold rounded-xl shadow-lg shadow-orange-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Create My CV — Free</span>
          <ArrowRight class="w-5 h-5" />
        </router-link>
        <router-link 
          to="/register" 
          class="w-full sm:w-auto px-8 py-4 border border-neutral-700 text-neutral-200 text-base font-semibold rounded-xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-2"
        >
          <UploadCloud class="w-5 h-5 text-brand-orange" />
          <span>Optimize Existing CV</span>
        </router-link>
      </div>

      <!-- Trust Row -->
      <div class="flex flex-wrap justify-center items-center gap-6 pt-6 text-xs text-neutral-500 font-medium">
        <div class="flex items-center gap-1.5">
          <CheckCircle2 class="w-3.5 h-3.5 text-emerald-500" />
          <span>Free forever plan</span>
        </div>
        <div class="flex items-center gap-1.5">
          <CheckCircle2 class="w-3.5 h-3.5 text-emerald-500" />
          <span>No credit card required</span>
        </div>
        <div class="flex items-center gap-1.5">
          <CheckCircle2 class="w-3.5 h-3.5 text-emerald-500" />
          <span>ATS-friendly templates</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { Rocket, ArrowRight, UploadCloud, CheckCircle2 } from '@lucide/vue'
</script>
