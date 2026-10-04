<template>
  <AppLayout>
    <div class="max-w-5xl mx-auto space-y-8">
      
      <!-- Page Header -->
      <div class="bg-white dark:bg-dark-card p-6 rounded-2xl border border-neutral-200 dark:border-dark-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400 text-xs font-bold mb-2">
            <Sparkles class="w-3.5 h-3.5" /> Premium AI Feature
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">AI CV Optimizer</h1>
          <p class="text-neutral-500 text-sm mt-1">Upload your existing CV (PDF/DOCX) for AI content analysis & enhancement.</p>
        </div>
        
        <div class="text-right text-xs text-neutral-400">
          <span>AI Quota: <strong class="text-brand-orange">8 / 10</strong> remaining</span>
        </div>
      </div>

      <!-- State 1: File Upload Box -->
      <div v-if="step === 'upload'" class="bg-white dark:bg-dark-card p-10 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-dark-border hover:border-brand-orange transition-colors text-center cursor-pointer space-y-4">
        <div class="w-16 h-16 rounded-full bg-orange-100 dark:bg-brand-orange/10 text-brand-orange flex items-center justify-center mx-auto">
          <UploadCloud class="w-8 h-8" />
        </div>
        <div>
          <h3 class="text-lg font-bold text-neutral-900 dark:text-white">Upload Your Existing CV</h3>
          <p class="text-neutral-500 text-sm mt-1">Drag and drop your document here, or browse files</p>
          <p class="text-xs text-neutral-400 mt-2">Supported formats: PDF, DOCX (Max size 5MB)</p>
        </div>
        
        <div class="pt-4">
          <button @click="simulateAnalysis" class="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold rounded-xl shadow-md transition">
            Select CV File
          </button>
        </div>
      </div>

      <!-- State 2: AI Processing Indicator -->
      <div v-else-if="step === 'analyzing'" class="bg-white dark:bg-dark-card p-12 rounded-2xl border border-neutral-200 dark:border-dark-border text-center space-y-6">
        <div class="w-16 h-16 rounded-full bg-orange-100 text-brand-orange flex items-center justify-center mx-auto animate-bounce">
          <Wand2 class="w-8 h-8" />
        </div>
        <div>
          <h3 class="text-xl font-bold text-neutral-900 dark:text-white">Analyzing Your CV Content...</h3>
          <p class="text-neutral-500 text-sm mt-1">Extracting sections, scoring ATS compatibility, and generating improvements using Gemini AI.</p>
        </div>
        <div class="w-64 mx-auto bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
          <div class="bg-brand-orange h-full w-2/3 animate-pulse"></div>
        </div>
      </div>

      <!-- State 3: AI Optimization Report & Suggestion Cards (PRD #16) -->
      <div v-else-if="step === 'report'" class="space-y-6">
        
        <!-- Overall Score Header -->
        <div class="bg-white dark:bg-dark-card p-6 rounded-2xl border border-neutral-200 dark:border-dark-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-6">
            <div class="w-20 h-20 rounded-full border-4 border-brand-orange flex flex-col items-center justify-center font-extrabold text-neutral-900 dark:text-white">
              <span class="text-2xl">84</span>
              <span class="text-[10px] text-neutral-400 uppercase">Score</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-neutral-900 dark:text-white">CV Analysis Completed</h3>
              <p class="text-sm text-neutral-500">Found 4 actionable content improvements & keyword additions.</p>
            </div>
          </div>

          <button @click="createOptimizedCV" class="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold rounded-xl shadow-md transition flex items-center gap-2">
            <span>Create Optimized CV</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>

        <!-- Suggestion Cards List -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-neutral-900 dark:text-white">AI Suggestions</h3>

          <div v-for="(suggestion, index) in suggestions" :key="index" class="bg-white dark:bg-dark-card p-6 rounded-2xl border border-neutral-200 dark:border-dark-border space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase text-brand-orange">{{ suggestion.section }}</span>
              <span class="text-xs text-neutral-400 font-medium">{{ suggestion.reason }}</span>
            </div>

            <div class="grid md:grid-cols-2 gap-4 text-xs">
              <div class="p-3 bg-red-50 dark:bg-red-500/10 text-red-900 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-900">
                <span class="font-bold block mb-1">Original:</span>
                <p>{{ suggestion.original }}</p>
              </div>
              <div class="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-900">
                <span class="font-bold block mb-1">AI Suggested:</span>
                <p>{{ suggestion.suggested }}</p>
              </div>
            </div>

            <!-- Action Buttons: Accept / Reject -->
            <div class="flex items-center justify-end gap-3 pt-2">
              <button class="px-3.5 py-1.5 border border-neutral-300 text-neutral-600 rounded-lg text-xs font-semibold hover:bg-neutral-100 flex items-center gap-1">
                <X class="w-3.5 h-3.5" /> Reject
              </button>
              <button class="px-3.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 flex items-center gap-1">
                <Check class="w-3.5 h-3.5" /> Accept Suggestion
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import { Sparkles, UploadCloud, Wand2, ArrowRight, Check, X } from 'lucide-vue-next'

const router = useRouter()
const step = ref<'upload' | 'analyzing' | 'report'>('upload')

const suggestions = ref([
  {
    section: 'Professional Summary',
    reason: 'Weak action verbs & missing keywords',
    original: 'Responsible for managing customers and solving technical problems.',
    suggested: 'Managed customer inquiries and resolved complex technical service issues while maintaining high customer satisfaction ratings.'
  },
  {
    section: 'Work Experience — Bullet #1',
    reason: 'Needs measurable achievements',
    original: 'Built front-end components using Vue.js for our core web app.',
    suggested: 'Architected responsive Vue.js frontend components, reducing page load times by 35% across core user workflows.'
  }
])

const simulateAnalysis = () => {
  step.value = 'analyzing'
  setTimeout(() => {
    step.value = 'report'
  }, 2000)
}

const createOptimizedCV = () => {
  router.push('/editor/opt-1')
}
</script>
