<template>
  <AppLayout>
    <div class="max-w-4xl mx-auto space-y-8 font-ui">
      
      <!-- Page Header -->
      <div class="bg-white dark:bg-dark-card p-6 rounded-2xl border border-neutral-200 dark:border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold mb-2">
            <Sparkles class="w-3.5 h-3.5" /> AI Writing Studio
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">AI Cover Letter Generator</h1>
          <p class="text-neutral-500 text-sm mt-1">Generate a tailored, persuasive cover letter matching your CV with any target job.</p>
        </div>
      </div>

      <!-- Generator Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left: Form inputs -->
        <div class="lg:col-span-5 bg-white dark:bg-dark-card p-6 rounded-2xl border border-neutral-200 dark:border-dark-border space-y-4 shadow-sm">
          <h3 class="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">Job Details</h3>
          
          <div>
            <label class="block text-xs font-medium text-neutral-500 mb-1">Target Job Title:</label>
            <input 
              v-model="jobTitle" 
              type="text" 
              placeholder="e.g. Senior Frontend Engineer" 
              class="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg text-neutral-900 dark:text-white focus:ring-1 focus:ring-brand-orange focus:outline-none" 
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-neutral-500 mb-1">Company Name:</label>
            <input 
              v-model="companyName" 
              type="text" 
              placeholder="e.g. Stripe, Paystack" 
              class="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg text-neutral-900 dark:text-white focus:ring-1 focus:ring-brand-orange focus:outline-none" 
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-neutral-500 mb-1">Job Description / Key Requirements:</label>
            <textarea 
              v-model="jobDescription" 
              rows="5" 
              placeholder="Paste job description requirements or responsibilities here..." 
              class="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg text-neutral-900 dark:text-white focus:ring-1 focus:ring-brand-orange focus:outline-none"
            ></textarea>
          </div>

          <button 
            @click="generateCoverLetter" 
            :disabled="isGenerating"
            class="w-full py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-xl text-xs font-semibold shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Wand2 v-if="!isGenerating" class="w-4 h-4" />
            <Loader2 v-else class="w-4 h-4 animate-spin" />
            <span>{{ isGenerating ? 'Crafting Cover Letter...' : 'Generate with AI' }}</span>
          </button>
        </div>

        <!-- Right: Generated Output Document -->
        <div class="lg:col-span-7 bg-white dark:bg-dark-card p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-dark-border space-y-4 shadow-sm flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex items-center justify-between border-b border-neutral-200 dark:border-dark-border pb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Generated Cover Letter</span>
              
              <div v-if="coverLetterText" class="flex items-center gap-2">
                <button @click="copyText" class="px-2.5 py-1 text-xs border border-neutral-300 dark:border-dark-border rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-dark-secondary flex items-center gap-1 transition">
                  <Check v-if="copied" class="w-3.5 h-3.5 text-emerald-500" />
                  <Copy v-else class="w-3.5 h-3.5" />
                  <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
                </button>
                <button @click="downloadText" class="px-2.5 py-1 text-xs bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 flex items-center gap-1 transition">
                  <Download class="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <div v-if="!coverLetterText && !isGenerating" class="py-16 text-center text-neutral-400 space-y-2">
              <FileText class="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-600" />
              <p class="text-xs">Fill in your target role and click "Generate with AI" to produce a tailored letter.</p>
            </div>

            <div v-else-if="isGenerating" class="py-16 text-center space-y-3">
              <div class="w-10 h-10 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mx-auto animate-bounce">
                <Wand2 class="w-5 h-5" />
              </div>
              <p class="text-xs text-neutral-500">Synthesizing candidate profile with target job requirements...</p>
            </div>

            <textarea 
              v-else 
              v-model="coverLetterText" 
              rows="14" 
              class="w-full p-4 rounded-xl font-cv text-xs sm:text-sm leading-relaxed border border-neutral-200 dark:border-dark-border bg-neutral-50/50 dark:bg-dark-bg text-neutral-900 dark:text-white focus:outline-none"
            ></textarea>
          </div>

          <div v-if="coverLetterText" class="text-xs text-neutral-400 pt-2 border-t border-neutral-100 dark:border-dark-border">
            Generated via <strong class="text-brand-orange">{{ provider }}</strong>. Ready to customize and submit.
          </div>
        </div>

      </div>

    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { Sparkles, Wand2, Copy, Download, Check, FileText, Loader2 } from '@lucide/vue'
import { useCVStore } from '@/stores/cv'

const cvStore = useCVStore()
const jobTitle = ref('Senior Full Stack Developer')
const companyName = ref('Acme Corp')
const jobDescription = ref('')
const coverLetterText = ref('')
const provider = ref('Google Gemini')
const isGenerating = ref(false)
const copied = ref(false)

async function generateCoverLetter() {
  isGenerating.value = true
  const currentCV = cvStore.currentCV || cvStore.cvList[0]

  try {
    const res = await fetch('/api/cover-letter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cvContent: currentCV,
        jobTitle: jobTitle.value,
        companyName: companyName.value,
        jobDescription: jobDescription.value
      })
    })

    const json = await res.json()
    if (json.data?.coverLetter) {
      coverLetterText.value = json.data.coverLetter
      provider.value = json.provider === 'gemini' ? 'Google Gemini' : json.provider === 'openrouter' ? 'OpenRouter' : 'CVForge AI Engine'
    }
  } catch (err) {
    console.warn('Cover letter request fallback:', err)
  } finally {
    isGenerating.value = false
  }
}

function copyText() {
  navigator.clipboard.writeText(coverLetterText.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

function downloadText() {
  const blob = new Blob([coverLetterText.value], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `Cover_Letter_${companyName.value.replace(/\s+/g, '_')}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>
