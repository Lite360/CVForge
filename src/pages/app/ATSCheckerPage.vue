<template>
  <AppLayout>
    <div class="max-w-4xl mx-auto space-y-8">
      
      <!-- Header -->
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white flex items-center gap-3">
          <CheckCircle2 class="w-8 h-8 text-emerald-500" />
          ATS Checker
        </h1>
        <p class="text-sm text-neutral-500 mt-2">
          Analyze how well your CV parses through Applicant Tracking Systems.
        </p>
      </div>

      <!-- Upload Section (if no file analyzed yet) -->
      <div v-if="!analysisResult && !isAnalyzing" class="bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-2xl p-8 sm:p-12 text-center shadow-sm">
        <div class="max-w-md mx-auto space-y-6">
          <div class="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <UploadCloud class="w-10 h-10" />
          </div>
          
          <div>
            <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-2">Upload your CV</h2>
            <p class="text-sm text-neutral-500">
              We'll scan your CV structure, formatting, and content to identify potential parsing issues. Supported formats: PDF, DOCX.
            </p>
          </div>

          <div class="relative group">
            <input 
              type="file" 
              accept=".pdf,.docx" 
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              @change="handleFileUpload"
            />
            <div class="border-2 border-dashed border-emerald-200 dark:border-emerald-500/30 group-hover:border-emerald-500 dark:group-hover:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/5 rounded-xl p-6 transition-all">
              <span class="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Click to browse or drag file here</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Analyzing State -->
      <div v-if="isAnalyzing" class="bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-2xl p-12 text-center shadow-sm space-y-6">
        <div class="w-16 h-16 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
        <div>
          <h2 class="text-xl font-bold text-neutral-900 dark:text-white">Analyzing CV Structure...</h2>
          <p class="text-sm text-neutral-500 mt-2">Checking formatting, keywords, and section readability.</p>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="analysisResult" class="space-y-6 animate-fade-in">
        
        <!-- Score Card -->
        <div class="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 class="text-2xl font-extrabold mb-1">ATS Compatibility Score</h2>
            <p class="text-emerald-200 text-sm">Your CV is well-structured but has a few areas for improvement.</p>
          </div>
          <div class="w-32 h-32 relative flex items-center justify-center shrink-0">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path class="text-emerald-950/40" stroke-dasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4" />
              <path class="text-emerald-400" :stroke-dasharray="`${analysisResult.score}, 100`" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4" />
            </svg>
            <span class="absolute text-3xl font-extrabold">{{ analysisResult.score }}</span>
          </div>
        </div>

        <!-- Breakdown Grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="(metric, key) in analysisResult.metrics" :key="key" class="bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border p-5 rounded-2xl text-center">
            <div class="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">{{ key }}</div>
            <div class="text-2xl font-extrabold text-neutral-900 dark:text-white" :class="getMetricColor(metric)">{{ metric }}%</div>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-2xl p-6 sm:p-8">
          <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-6">Actionable Recommendations</h3>
          <div class="space-y-4">
            <div v-for="(rec, index) in analysisResult.recommendations" :key="index" class="flex gap-4 p-4 rounded-xl" :class="rec.type === 'error' ? 'bg-red-50 dark:bg-red-500/10' : 'bg-amber-50 dark:bg-amber-500/10'">
              <div class="shrink-0 mt-0.5">
                <AlertCircle v-if="rec.type === 'error'" class="w-5 h-5 text-red-500" />
                <AlertTriangle v-else class="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h4 class="font-bold text-sm text-neutral-900 dark:text-white">{{ rec.title }}</h4>
                <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{{ rec.description }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex justify-end gap-3">
          <button @click="reset" class="px-5 py-2.5 bg-neutral-100 dark:bg-dark-secondary text-neutral-700 dark:text-neutral-300 font-semibold rounded-xl hover:bg-neutral-200 dark:hover:bg-dark-border transition">
            Scan Another CV
          </button>
          <router-link to="/optimizer" class="px-5 py-2.5 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition flex items-center gap-2">
            <Wand2 class="w-4 h-4" />
            Optimize with AI
          </router-link>
        </div>

      </div>

    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { CheckCircle2, UploadCloud, AlertCircle, AlertTriangle, Wand2 } from 'lucide-vue-next'

const isAnalyzing = ref(false)
const analysisResult = ref<any>(null)

function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    isAnalyzing.value = true
    
    // Simulate AI ATS analysis
    setTimeout(() => {
      analysisResult.value = {
        score: 84,
        metrics: {
          'Keyword Match': 82,
          'Structure': 95,
          'Skills': 78,
          'Formatting': 91
        },
        recommendations: [
          { type: 'error', title: 'Missing Contact Details', description: 'Your LinkedIn URL is missing or not formatted correctly as a hyperlink.' },
          { type: 'warning', title: 'Vague Action Verbs', description: 'Found 3 instances of "Responsible for". Replace with strong action verbs like "Managed" or "Engineered".' },
          { type: 'warning', title: 'Dates Formatting', description: 'Ensure all dates use a consistent Month Year format (e.g., Jan 2020 - Present).' }
        ]
      }
      isAnalyzing.value = false
    }, 2500)
  }
}

function getMetricColor(value: number) {
  if (value >= 90) return 'text-emerald-500'
  if (value >= 75) return 'text-amber-500'
  return 'text-red-500'
}

function reset() {
  analysisResult.value = null
  isAnalyzing.value = false
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
