<template>
  <section id="optimizer" class="py-24 bg-white dark:bg-dark-bg border-b border-neutral-100 dark:border-dark-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Left: Content -->
        <div class="space-y-6">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold tracking-wide">
            <Wand2 class="w-3.5 h-3.5" />
            AI-POWERED OPTIMIZATION
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight">
            Already Have a CV? <br />
            <span class="text-gradient-orange">Let AI Make It Better.</span>
          </h2>

          <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Upload your existing CV and our Ayo AI analyzes every section — improving weak wording, adding missing keywords, strengthening achievement descriptions, and tailoring content to your target role.
          </p>

          <!-- Steps -->
          <div class="space-y-4 pt-2">
            <div v-for="step in steps" :key="step.number" class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange font-extrabold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                {{ step.number }}
              </div>
              <div>
                <h4 class="font-bold text-sm text-neutral-900 dark:text-white">{{ step.title }}</h4>
                <p class="text-xs text-neutral-500 mt-0.5">{{ step.description }}</p>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <router-link to="/register" class="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95">
              <UploadCloud class="w-5 h-5" />
              Optimize My CV
            </router-link>
          </div>
        </div>

        <!-- Right: Visual Demo -->
        <div class="bg-neutral-50 dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border p-6 sm:p-8 space-y-5">
          
          <!-- Score Header -->
          <div class="flex items-center gap-5">
            <div class="w-16 h-16 rounded-full border-4 border-brand-orange flex flex-col items-center justify-center">
              <span class="text-xl font-extrabold text-neutral-900 dark:text-white">84</span>
              <span class="text-[9px] text-neutral-400 uppercase font-bold">Score</span>
            </div>
            <div>
              <h4 class="font-bold text-neutral-900 dark:text-white">CV Analysis Complete</h4>
              <p class="text-xs text-neutral-500">4 improvements identified</p>
            </div>
          </div>

          <div class="h-px bg-neutral-200 dark:bg-dark-border"></div>

          <!-- Sample Suggestion -->
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase text-brand-orange">Professional Summary</span>
            
            <div class="p-3 bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-900 text-xs">
              <span class="font-bold block mb-1">Original:</span>
              <p class="italic">Responsible for managing customers and solving technical problems.</p>
            </div>
            
            <div class="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-900 text-xs">
              <span class="font-bold block mb-1">AI Suggested:</span>
              <p class="italic">Managed customer inquiries and resolved complex technical service issues while maintaining high customer satisfaction ratings.</p>
            </div>

            <div class="flex items-center gap-2 pt-1">
              <button class="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1">
                <Check class="w-3 h-3" /> Accept
              </button>
              <button class="px-3 py-1.5 border border-neutral-300 dark:border-dark-border text-neutral-600 dark:text-neutral-400 rounded-lg text-xs font-semibold flex items-center gap-1">
                <Pencil class="w-3 h-3" /> Edit
              </button>
              <button class="px-3 py-1.5 border border-neutral-300 dark:border-dark-border text-neutral-600 dark:text-neutral-400 rounded-lg text-xs font-semibold flex items-center gap-1">
                <X class="w-3 h-3" /> Reject
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Wand2, UploadCloud, Check, Pencil, X } from '@lucide/vue'

const steps = [
  {
    number: '1',
    title: 'Upload Your CV',
    description: 'Drag and drop your existing PDF or DOCX document.'
  },
  {
    number: '2',
    title: 'AI Analyzes Content',
    description: 'Gemini AI extracts text, scores sections, and identifies improvements.'
  },
  {
    number: '3',
    title: 'Review Suggestions',
    description: 'Accept, edit, or reject each recommendation individually.'
  },
  {
    number: '4',
    title: 'Get Your Optimized CV',
    description: 'Generate a new CV with accepted improvements in your chosen template.'
  }
]
</script>
