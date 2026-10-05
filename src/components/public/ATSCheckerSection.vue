<template>
  <section id="ats" class="py-24 bg-neutral-50 dark:bg-dark-secondary/50 border-b border-neutral-100 dark:border-dark-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Left: Visual Demo -->
        <div class="order-2 lg:order-1 bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border p-6 sm:p-8 space-y-6">
          
          <!-- Score Circle -->
          <div class="flex items-center justify-center">
            <div class="relative w-32 h-32">
              <svg class="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" stroke-width="10" fill="none" class="stroke-neutral-200 dark:stroke-dark-border" />
                <circle cx="60" cy="60" r="52" stroke-width="10" fill="none" class="stroke-emerald-500" stroke-linecap="round" :stroke-dasharray="circumference" :stroke-dashoffset="circumference - (circumference * 84 / 100)" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-3xl font-extrabold text-neutral-900 dark:text-white">84</span>
                <span class="text-xs text-neutral-400 uppercase font-bold">ATS Score</span>
              </div>
            </div>
          </div>

          <!-- Score Breakdown -->
          <div class="space-y-3">
            <div v-for="metric in metrics" :key="metric.label" class="space-y-1.5">
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold text-neutral-700 dark:text-neutral-300">{{ metric.label }}</span>
                <span class="font-bold text-neutral-900 dark:text-white">{{ metric.value }}%</span>
              </div>
              <div class="h-2 bg-neutral-100 dark:bg-dark-secondary rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-700"
                  :class="metric.value >= 80 ? 'bg-emerald-500' : metric.value >= 60 ? 'bg-amber-500' : 'bg-red-500'"
                  :style="{ width: metric.value + '%' }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Sample Recommendations -->
          <div class="pt-2 space-y-2">
            <div v-for="rec in recommendations" :key="rec" class="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <AlertCircle class="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>{{ rec }}</span>
            </div>
          </div>
        </div>

        <!-- Right: Content -->
        <div class="order-1 lg:order-2 space-y-6">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-wide">
            <ShieldCheck class="w-3.5 h-3.5" />
            ATS COMPATIBILITY
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight">
            Will Your CV Pass <br />
            <span class="text-gradient-orange">the ATS Scanner?</span>
          </h2>

          <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Over 75% of CVs are rejected by Applicant Tracking Systems before a human ever reads them. CVForge's ATS Checker analyzes your document against real parsing criteria and shows exactly where to improve.
          </p>

          <ul class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
            <li class="flex items-center gap-2.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              Keyword relevance analysis
            </li>
            <li class="flex items-center gap-2.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              Section structure validation
            </li>
            <li class="flex items-center gap-2.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              Formatting risk detection
            </li>
            <li class="flex items-center gap-2.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              Content quality scoring
            </li>
            <li class="flex items-center gap-2.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              Actionable fix recommendations
            </li>
          </ul>

          <div class="pt-4">
            <router-link to="/register" class="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95">
              <ShieldCheck class="w-5 h-5" />
              Check My ATS Score
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ShieldCheck, CheckCircle2, AlertCircle } from '@lucide/vue'

const circumference = 2 * Math.PI * 52

const metrics = [
  { label: 'Keyword Match', value: 82 },
  { label: 'Structure', value: 95 },
  { label: 'Skills Alignment', value: 78 },
  { label: 'Experience Relevance', value: 86 },
  { label: 'Formatting', value: 91 }
]

const recommendations = [
  'Add 3 missing industry keywords to your skills section',
  'Move professional summary above work experience',
  'Replace graphic elements with text-based formatting'
]
</script>
