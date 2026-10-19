<template>
  <AppLayout>
    <div class="max-w-5xl mx-auto space-y-8 font-ui">
      
      <!-- Page Header -->
      <div class="bg-white dark:bg-dark-card p-6 rounded-2xl border border-neutral-200 dark:border-dark-border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 text-xs font-bold mb-2">
            <Sparkles class="w-3.5 h-3.5" /> AI Career Coach
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">AI Interview Studio</h1>
          <p class="text-neutral-500 text-sm mt-1">Generate role-tailored behavioral and technical interview questions with STAR coaching outlines.</p>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-xs text-neutral-400">Powered by <strong class="text-brand-orange">{{ provider }}</strong></span>
        </div>
      </div>

      <!-- Controls & Parameters -->
      <div class="bg-white dark:bg-dark-card p-6 rounded-2xl border border-neutral-200 dark:border-dark-border shadow-sm space-y-4">
        <h2 class="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">Interview Parameters</h2>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-medium text-neutral-500 mb-1">Target Job Title:</label>
            <input 
              v-model="jobTitle" 
              type="text" 
              placeholder="e.g. Senior Software Engineer" 
              class="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg text-neutral-900 dark:text-white focus:ring-1 focus:ring-brand-orange focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-neutral-500 mb-1">Industry / Domain:</label>
            <select 
              v-model="industry" 
              class="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg text-neutral-900 dark:text-white focus:ring-1 focus:ring-brand-orange focus:outline-none"
            >
              <option value="Technology & SaaS">Technology & SaaS</option>
              <option value="Fintech & Banking">Fintech & Banking</option>
              <option value="Healthcare & HealthTech">Healthcare & HealthTech</option>
              <option value="E-Commerce & Retail">E-Commerce & Retail</option>
              <option value="Consulting & Agency">Consulting & Agency</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-neutral-500 mb-1">Experience Level:</label>
            <select 
              v-model="experienceLevel" 
              class="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg text-neutral-900 dark:text-white focus:ring-1 focus:ring-brand-orange focus:outline-none"
            >
              <option value="Entry / Graduate">Entry / Graduate (0-2 yrs)</option>
              <option value="Mid-Level">Mid-Level (3-5 yrs)</option>
              <option value="Senior">Senior (5-8 yrs)</option>
              <option value="Lead / Principal">Lead / Principal (8+ yrs)</option>
            </select>
          </div>
        </div>

        <div class="pt-2 flex justify-end">
          <button 
            @click="generateQuestions" 
            :disabled="isGenerating"
            class="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-2 disabled:opacity-60"
          >
            <Wand2 v-if="!isGenerating" class="w-4 h-4" />
            <Loader2 v-else class="w-4 h-4 animate-spin" />
            <span>{{ isGenerating ? 'Analyzing CV & Generating Questions...' : 'Generate Mock Interview' }}</span>
          </button>
        </div>
      </div>

      <!-- Readiness Tip Callout -->
      <div v-if="readinessTip" class="p-4 bg-orange-50 dark:bg-brand-orange/10 border border-brand-orange/20 rounded-2xl flex items-center gap-3">
        <Lightbulb class="w-5 h-5 text-brand-orange shrink-0" />
        <p class="text-xs text-neutral-800 dark:text-neutral-200">
          <strong>Coach's Golden Rule:</strong> {{ readinessTip }}
        </p>
      </div>

      <!-- Questions List -->
      <div v-if="questions.length > 0" class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-neutral-900 dark:text-white">Curated Interview Questions ({{ questions.length }})</h2>
          <span class="text-xs text-neutral-400">Click a card to reveal STAR breakdown</span>
        </div>

        <div 
          v-for="(q, idx) in questions" 
          :key="q.id || idx"
          class="bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border p-5 shadow-sm space-y-4 transition hover:border-brand-orange/40"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  :class="[
                    q.category === 'Behavioral' ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400' :
                    q.category === 'Technical' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-400' :
                    q.category === 'Leadership' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400' :
                    'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
                  ]"
                >
                  {{ q.category }}
                </span>
                <span class="text-xs text-neutral-400">Question {{ idx + 1 }} of {{ questions.length }}</span>
              </div>
              <h3 class="text-sm font-bold text-neutral-900 dark:text-white pt-1">{{ q.question }}</h3>
            </div>

            <button 
              @click="toggleExpand(idx)" 
              class="text-xs text-brand-orange font-bold hover:underline shrink-0 flex items-center gap-1"
            >
              <span>{{ expanded[idx] ? 'Hide Answer Guide' : 'Show Answer Guide' }}</span>
              <ChevronDown class="w-3.5 h-3.5 transition-transform" :class="{ 'rotate-180': expanded[idx] }" />
            </button>
          </div>

          <!-- Collapsible Guide -->
          <div v-show="expanded[idx]" class="pt-3 border-t border-neutral-100 dark:border-dark-border space-y-3 text-xs">
            <div class="p-3 rounded-xl bg-neutral-50 dark:bg-dark-secondary">
              <span class="font-bold text-neutral-900 dark:text-white block mb-1">What Hiring Managers Look For:</span>
              <p class="text-neutral-600 dark:text-neutral-400">{{ q.what_interviewers_look_for }}</p>
            </div>

            <div class="p-3 rounded-xl bg-orange-50/60 dark:bg-brand-orange/5 border border-brand-orange/15">
              <span class="font-bold text-brand-orange block mb-1">Recommended STAR Answer Framework:</span>
              <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed font-cv">{{ q.suggested_star_answer }}</p>
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
import { Sparkles, Wand2, Lightbulb, ChevronDown, Loader2 } from '@lucide/vue'
import { useCVStore } from '@/stores/cv'

const cvStore = useCVStore()
const jobTitle = ref('Senior Software Engineer')
const industry = ref('Technology & SaaS')
const experienceLevel = ref('Senior')
const readinessTip = ref('Ground every behavioral answer with quantifiable metrics (%, time saved, business revenue impact).')
const provider = ref('Google Gemini')
const isGenerating = ref(false)

const expanded = ref<Record<number, boolean>>({ 0: true })

function toggleExpand(idx: number) {
  expanded.value[idx] = !expanded.value[idx]
}

const questions = ref([
  {
    id: 1,
    category: 'Behavioral',
    question: 'Tell me about a high-stakes technical challenge you faced at your previous role and how you navigated it.',
    what_interviewers_look_for: 'Problem decomposition, cross-functional communication, and accountability under pressure.',
    suggested_star_answer: 'Situation: Outdated microservice causing intermittent latency. Task: Lead architecture overhaul. Action: Built automated benchmarks and deployed canary releases. Result: Cut latency by 45%.'
  },
  {
    id: 2,
    category: 'Technical',
    question: 'How do you ensure data integrity and low latency when designing scalable database schemas for modern applications?',
    what_interviewers_look_for: 'Understanding of indexing, normalization tradeoffs, connection pooling, and caching layers.',
    suggested_star_answer: 'Focus on query execution plans, appropriate B-tree or GiST indexing, Redis caching for hot reads, and read replicas.'
  },
  {
    id: 3,
    category: 'Situational',
    question: 'How do you handle conflicting architectural priorities between engineering quality and tight product release deadlines?',
    what_interviewers_look_for: 'Pragmatism, technical debt tracking, and business empathy.',
    suggested_star_answer: 'Acknowledge scope tradeoffs, ship an MVP with robust telemetry, and schedule dedicated refactoring sprints immediately after launch.'
  }
])

async function generateQuestions() {
  isGenerating.value = true
  const currentCV = cvStore.currentCV || cvStore.cvList[0]

  try {
    const res = await fetch('/api/interview-prep', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cvContent: currentCV,
        jobTitle: jobTitle.value,
        industry: industry.value,
        experienceLevel: experienceLevel.value
      })
    })

    const json = await res.json()
    if (json.data?.questions) {
      questions.value = json.data.questions
      readinessTip.value = json.data.readiness_tip || readinessTip.value
      provider.value = json.provider === 'gemini' ? 'Google Gemini' : json.provider === 'openrouter' ? 'OpenRouter' : 'CVForge AI Engine'
      expanded.value = { 0: true }
    }
  } catch (err) {
    console.warn('Interview prep fallback:', err)
  } finally {
    isGenerating.value = false
  }
}
</script>
