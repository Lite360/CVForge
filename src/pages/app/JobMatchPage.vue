<template>
  <AppLayout>
    <div class="max-w-5xl mx-auto space-y-8">
      
      <!-- Header -->
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white flex items-center gap-3">
          <Target class="w-8 h-8 text-indigo-500" />
          Job Description Match
        </h1>
        <p class="text-sm text-neutral-500 mt-2">
          Compare your CV against a specific job description to find missing keywords and tailor your application.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Input Section -->
        <div class="space-y-6">
          <div class="bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
            <h3 class="font-bold text-neutral-900 dark:text-white mb-4">1. Select your CV</h3>
            <div class="space-y-3">
              <label v-for="cv in cvs" :key="cv.id" class="flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all" :class="selectedCvId === cv.id ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10' : 'border-neutral-200 dark:border-dark-border hover:border-indigo-300'">
                <div class="flex items-center gap-3">
                  <input type="radio" :value="cv.id" v-model="selectedCvId" class="text-indigo-500 focus:ring-indigo-500" />
                  <div>
                    <div class="font-bold text-sm text-neutral-900 dark:text-white">{{ cv.title }}</div>
                    <div class="text-xs text-neutral-500">{{ cv.lastUpdated }}</div>
                  </div>
                </div>
                <FileText class="w-4 h-4 text-neutral-400" />
              </label>
            </div>
            <div v-if="!cvs.length" class="text-sm text-neutral-500 text-center py-4">
              No CVs found. <router-link to="/editor/new" class="text-brand-orange font-bold hover:underline">Create one first.</router-link>
            </div>
          </div>

          <div class="bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-2xl p-6 shadow-sm flex flex-col">
            <h3 class="font-bold text-neutral-900 dark:text-white mb-4">2. Paste Job Description</h3>
            <textarea 
              v-model="jobDescription" 
              placeholder="Paste the full job description here..."
              class="flex-1 min-h-[250px] w-full p-4 bg-neutral-50 dark:bg-dark-secondary border border-neutral-200 dark:border-dark-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all resize-none"
            ></textarea>
            
            <button 
              @click="analyzeMatch" 
              :disabled="!selectedCvId || !jobDescription.trim() || isAnalyzing"
              class="w-full mt-4 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Loader2 v-if="isAnalyzing" class="w-4 h-4 animate-spin" />
              <Target v-else class="w-4 h-4" />
              {{ isAnalyzing ? 'Analyzing Match...' : 'Analyze Match' }}
            </button>
          </div>
        </div>

        <!-- Output Section -->
        <div class="bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-2xl p-6 shadow-sm min-h-[500px]">
          
          <div v-if="!matchResult && !isAnalyzing" class="h-full flex flex-col items-center justify-center text-neutral-400 space-y-4">
            <Target class="w-12 h-12 opacity-20" />
            <p class="text-sm">Select a CV and paste a job description to see your match score.</p>
          </div>
          
          <div v-else-if="isAnalyzing" class="h-full flex flex-col items-center justify-center text-indigo-500 space-y-4">
            <div class="w-12 h-12 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>
            <p class="text-sm font-bold text-neutral-700 dark:text-neutral-300">Comparing your CV to the job requirements...</p>
          </div>

          <div v-else-if="matchResult" class="space-y-6 animate-fade-in">
            <div class="flex items-center justify-between border-b border-neutral-200 dark:border-dark-border pb-6">
              <div>
                <div class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Overall Match</div>
                <div class="text-3xl font-extrabold" :class="matchResult.score >= 80 ? 'text-emerald-500' : matchResult.score >= 60 ? 'text-amber-500' : 'text-red-500'">
                  {{ matchResult.score }}%
                </div>
              </div>
              <router-link :to="`/editor/${selectedCvId}?jobMatch=true`" class="px-4 py-2 bg-brand-orange text-white text-sm font-bold rounded-xl shadow-md hover:bg-brand-orange-hover transition flex items-center gap-2">
                <Wand2 class="w-4 h-4" /> Tailor CV
              </router-link>
            </div>

            <div>
              <h4 class="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2 mb-3">
                <CheckCircle2 class="w-4 h-4 text-emerald-500" /> Matching Skills & Keywords
              </h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in matchResult.matching" :key="skill" class="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-lg border border-emerald-200 dark:border-emerald-500/20">
                  {{ skill }}
                </span>
              </div>
            </div>

            <div>
              <h4 class="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2 mb-3">
                <AlertCircle class="w-4 h-4 text-red-500" /> Missing Requirements
              </h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in matchResult.missing" :key="skill" class="px-2.5 py-1 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-xs font-bold rounded-lg border border-red-200 dark:border-red-500/20">
                  {{ skill }}
                </span>
              </div>
              <p class="text-xs text-neutral-500 mt-2">Consider adding these if you have experience with them.</p>
            </div>
            
            <div>
              <h4 class="font-bold text-sm text-neutral-900 dark:text-white mb-2">AI Suggestions</h4>
              <ul class="space-y-3">
                 <li v-for="(suggestion, i) in matchResult.suggestions" :key="i" class="text-sm text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-dark-secondary p-3 rounded-lg border border-neutral-100 dark:border-dark-border">
                   {{ suggestion }}
                 </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { Target, FileText, Loader2, CheckCircle2, AlertCircle, Wand2 } from 'lucide-vue-next'

const selectedCvId = ref('')
const jobDescription = ref('')
const isAnalyzing = ref(false)
const matchResult = ref<any>(null)

// Mock CVs
const cvs = ref([
  { id: '1', title: 'Senior Software Engineer CV', lastUpdated: '2 hours ago' },
  { id: '2', title: 'Product Manager Resume 2026', lastUpdated: 'Yesterday' }
])

function analyzeMatch() {
  if (!selectedCvId.value || !jobDescription.value.trim()) return
  
  isAnalyzing.value = true
  matchResult.value = null
  
  // Simulate AI Job Match analysis
  setTimeout(() => {
    matchResult.value = {
      score: 74,
      matching: ['TypeScript', 'Vue.js', 'Node.js', 'Agile', 'REST APIs'],
      missing: ['GraphQL', 'AWS', 'Docker', 'CI/CD Pipelines'],
      suggestions: [
        'Highlight your experience with deployment processes to compensate for missing Docker/AWS keywords.',
        'The job emphasizes "leadership" 4 times. Ensure your recent role highlights mentoring or leading initiatives.',
        'Add any experience you have with GraphQL to the Skills section.'
      ]
    }
    isAnalyzing.value = false
  }, 3000)
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
