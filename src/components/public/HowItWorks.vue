<template>
  <div class="py-20 bg-neutral-50 dark:bg-dark-secondary/50 border-b border-neutral-100 dark:border-dark-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">Dual Workflows</h2>
        <p class="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">How CVForge Works</p>
        <p class="mt-3 text-neutral-600 dark:text-neutral-400">Choose the path that fits your current career needs.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
        <!-- Workflow A -->
        <div class="bg-white dark:bg-dark-card p-8 rounded-2xl border border-neutral-200 dark:border-dark-border shadow-sm flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-orange-100 dark:bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6">
              <FilePlus class="w-6 h-6" />
            </div>
            <span class="text-xs font-bold uppercase tracking-wider text-brand-orange">Workflow A</span>
            <h3 class="text-2xl font-bold text-neutral-900 dark:text-white mt-1 mb-3">Create CV From Scratch</h3>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              Build a polished CV step-by-step using structured sections, live A4 preview, and recruiter-approved templates.
            </p>

            <ul class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              <li class="flex items-center gap-2.5"><span class="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold flex items-center justify-center">1</span> Choose Template</li>
              <li class="flex items-center gap-2.5"><span class="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold flex items-center justify-center">2</span> Enter CV Information</li>
              <li class="flex items-center gap-2.5"><span class="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold flex items-center justify-center">3</span> Live A4 Preview & Edit</li>
              <li class="flex items-center gap-2.5"><span class="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold flex items-center justify-center">4</span> Export PDF / DOCX</li>
            </ul>
          </div>

          <div class="pt-8">
            <router-link to="/dashboard" class="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange-hover">
              <span>Start from Scratch</span>
              <ArrowRight class="w-4 h-4" />
            </router-link>
          </div>
        </div>

        <!-- Workflow B -->
        <div class="bg-white dark:bg-dark-card p-8 rounded-2xl border border-neutral-200 dark:border-dark-border shadow-sm flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
              <Wand2 class="w-6 h-6" />
            </div>
            <span class="text-xs font-bold uppercase tracking-wider text-amber-600">Workflow B</span>
            <h3 class="text-2xl font-bold text-neutral-900 dark:text-white mt-1 mb-3">AI CV Optimizer</h3>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              Upload your existing PDF or DOCX CV. Our Gemini AI analyzes your content and provides instant structured improvement suggestions.
            </p>

            <ul class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              <li class="flex items-center gap-2.5"><span class="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold flex items-center justify-center">1</span> Upload PDF/DOCX Document</li>
              <li class="flex items-center gap-2.5"><span class="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold flex items-center justify-center">2</span> Text Extraction & AI Analysis</li>
              <li class="flex items-center gap-2.5"><span class="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold flex items-center justify-center">3</span> Review Accept/Reject Suggestions</li>
              <li class="flex items-center gap-2.5"><span class="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold flex items-center justify-center">4</span> Generate Optimized CV</li>
            </ul>
          </div>

          <div class="pt-8">
            <router-link to="/optimizer" class="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700">
              <span>Optimize Existing CV</span>
              <ArrowRight class="w-4 h-4" />
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { FilePlus, Wand2, ArrowRight } from '@lucide/vue'
</script>
