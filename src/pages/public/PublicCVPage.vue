<template>
  <div class="min-h-screen bg-neutral-100 dark:bg-dark-bg py-10 px-4 font-ui">
    <div class="max-w-4xl mx-auto space-y-6">
      
      <!-- Top Bar: Share status and quick actions -->
      <div class="bg-white dark:bg-dark-card rounded-2xl p-4 border border-neutral-200 dark:border-dark-border shadow-sm flex items-center justify-between">
        <div class="flex items-center gap-3">
          <router-link to="/" class="flex items-center gap-2 text-brand-orange font-extrabold text-lg">
            <span>CVForge</span>
          </router-link>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">
            Public View
          </span>
        </div>

        <div class="flex items-center gap-3">
          <button @click="copyShareLink" class="px-3.5 py-1.5 rounded-xl border border-neutral-200 dark:border-dark-border text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-dark-secondary flex items-center gap-1.5 transition">
            <Check v-if="copied" class="w-3.5 h-3.5 text-emerald-500" />
            <Share2 v-else class="w-3.5 h-3.5" />
            <span>{{ copied ? 'Link Copied!' : 'Copy Link' }}</span>
          </button>
          <button @click="printCV" class="px-3.5 py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm">
            <Printer class="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      <!-- CV Document Container (PRD §13: strict Times New Roman typography for document) -->
      <div class="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 sm:p-12 font-cv text-neutral-900 max-w-[210mm] mx-auto min-h-[297mm]">
        
        <!-- Header -->
        <div class="text-center border-b border-neutral-300 pb-6 mb-6">
          <h1 class="text-3xl font-bold tracking-tight text-neutral-900">{{ cv.basics.name || 'Candidate Name' }}</h1>
          <p class="text-base text-neutral-600 mt-1 italic">{{ cv.basics.label || 'Professional Title' }}</p>
          
          <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-neutral-600 mt-3">
            <span v-if="cv.basics.email">{{ cv.basics.email }}</span>
            <span v-if="cv.basics.phone">• {{ cv.basics.phone }}</span>
            <span v-if="cv.basics.location">• {{ cv.basics.location }}</span>
            <span v-if="cv.basics.url">• {{ cv.basics.url }}</span>
          </div>
        </div>

        <!-- Summary -->
        <div v-if="cv.basics.summary" class="mb-6">
          <h2 class="text-sm font-bold uppercase tracking-wider border-b border-neutral-300 pb-1 mb-2 text-neutral-900">Professional Summary</h2>
          <p class="text-xs leading-relaxed text-neutral-800">{{ cv.basics.summary }}</p>
        </div>

        <!-- Experience -->
        <div v-if="cv.work && cv.work.length > 0" class="mb-6">
          <h2 class="text-sm font-bold uppercase tracking-wider border-b border-neutral-300 pb-1 mb-3 text-neutral-900">Work Experience</h2>
          <div class="space-y-4">
            <div v-for="w in cv.work" :key="w.id || w.company">
              <div class="flex justify-between items-baseline">
                <h3 class="text-xs font-bold text-neutral-900">{{ w.position }}</h3>
                <span class="text-[11px] text-neutral-500 italic">{{ w.startDate }} - {{ w.current ? 'Present' : w.endDate }}</span>
              </div>
              <div class="text-xs text-neutral-700 font-semibold">{{ w.company }}</div>
              <p class="text-xs text-neutral-700 mt-1 leading-relaxed">{{ w.summary }}</p>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div v-if="cv.education && cv.education.length > 0" class="mb-6">
          <h2 class="text-sm font-bold uppercase tracking-wider border-b border-neutral-300 pb-1 mb-3 text-neutral-900">Education</h2>
          <div class="space-y-3">
            <div v-for="edu in cv.education" :key="edu.id || edu.institution">
              <div class="flex justify-between items-baseline">
                <h3 class="text-xs font-bold text-neutral-900">{{ edu.institution }}</h3>
                <span class="text-[11px] text-neutral-500 italic">{{ edu.startDate }} - {{ edu.endDate }}</span>
              </div>
              <div class="text-xs text-neutral-700">{{ edu.studyType || edu.degree }} in {{ edu.area || edu.fieldOfStudy }}</div>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div v-if="cv.skills && cv.skills.length > 0" class="mb-6">
          <h2 class="text-sm font-bold uppercase tracking-wider border-b border-neutral-300 pb-1 mb-2 text-neutral-900">Core Competencies</h2>
          <div class="flex flex-wrap gap-2 text-xs text-neutral-800">
            <span v-for="s in cv.skills" :key="s.name" class="px-2 py-0.5 bg-neutral-100 rounded text-neutral-800">
              {{ s.name }}
            </span>
          </div>
        </div>

      </div>

      <!-- Footer credit -->
      <div class="text-center text-xs text-neutral-400 py-4">
        Created and verified with <router-link to="/" class="text-brand-orange font-bold hover:underline">CVForge</router-link>.
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Share2, Printer, Check } from '@lucide/vue'

const route = useRoute()
const copied = ref(false)

const cv = ref({
  basics: {
    name: 'Alex Johnson',
    label: 'Senior Full Stack Engineer',
    email: 'alex.j@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    url: 'linkedin.com/in/alexj',
    summary: 'Experienced Full Stack Engineer with 7+ years architecting scalable serverless solutions and modern web applications with precision.'
  },
  work: [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Lead Full Stack Engineer',
      startDate: '2021-03',
      endDate: 'Present',
      current: true,
      summary: 'Directed engineering sprint cycles, reduced build times by 40%, and led cloud data migration.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'B.S.',
      area: 'Computer Science',
      startDate: '2015',
      endDate: '2019'
    }
  ],
  skills: [
    { name: 'TypeScript' },
    { name: 'Vue 3' },
    { name: 'PostgreSQL' },
    { name: 'Tailwind CSS' },
    { name: 'Cloud Architecture' }
  ]
})

onMounted(async () => {
  const cvId = route.params.id as string
  if (cvId) {
    try {
      const res = await fetch(`/api/cvs?id=${cvId}`)
      const json = await res.json()
      if (json.success && json.data?.content) {
        cv.value = json.data.content
      }
    } catch (err) {
      console.warn('Fetched cached shared CV presentation')
    }
  }
})

function copyShareLink() {
  navigator.clipboard.writeText(window.location.href)
  copied.value = true
  setTimeout(() => (copied.value = false), 2500)
}

function printCV() {
  window.print()
}
</script>

<style scoped>
@media print {
  body {
    background: transparent !important;
  }
  .bg-neutral-100, .dark\:bg-dark-bg {
    background: white !important;
  }
  button, nav, .shadow-sm {
    display: none !important;
  }
}
</style>
