<template>
  <div class="h-screen flex flex-col bg-neutral-100 dark:bg-dark-bg font-ui">
    
    <!-- Top Action Bar -->
    <header class="bg-white dark:bg-dark-card border-b border-neutral-200 dark:border-dark-border px-4 py-3 flex items-center justify-between z-20">
      <div class="flex items-center gap-3">
        <router-link to="/dashboard" class="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-lg">
          <ArrowLeft class="w-5 h-5" />
        </router-link>
        <input 
          v-model="cv.title" 
          type="text" 
          class="font-bold text-base bg-transparent text-neutral-900 dark:text-white border-b border-transparent hover:border-neutral-300 focus:border-brand-orange focus:outline-none px-1 py-0.5"
        />
        
        <!-- Autosave Status Badge -->
        <span class="inline-flex items-center gap-1.5 text-xs text-neutral-400 pl-3 border-l border-neutral-200 dark:border-dark-border">
          <span v-if="saveStatus === 'saving'" class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span v-else class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span class="capitalize">{{ saveStatus }}</span>
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3">
        <button class="px-3.5 py-1.5 border border-neutral-300 dark:border-dark-border rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-dark-secondary flex items-center gap-1.5">
          <Eye class="w-4 h-4" /> Preview
        </button>
        <button class="px-4 py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg text-xs font-semibold shadow-sm transition flex items-center gap-1.5">
          <Download class="w-4 h-4" /> Export PDF
        </button>
      </div>
    </header>

    <!-- 3-Column Editor Layout (PRD #11) -->
    <div class="flex-grow flex overflow-hidden">
      
      <!-- Column 1: CV Navigation Sections Sidebar -->
      <aside class="w-48 bg-white dark:bg-dark-card border-r border-neutral-200 dark:border-dark-border p-3 hidden md:flex flex-col gap-1 overflow-y-auto">
        <button 
          v-for="section in sections" 
          :key="section.id"
          @click="activeSection = section.id"
          :class="[activeSection === section.id ? 'bg-orange-50 dark:bg-brand-orange/10 text-brand-orange font-bold' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-dark-secondary']"
          class="w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors"
        >
          <component :is="section.icon" class="w-4 h-4" />
          <span>{{ section.name }}</span>
        </button>
      </aside>

      <!-- Column 2: Form Input Editor -->
      <main class="w-full md:w-1/2 lg:w-5/12 bg-white dark:bg-dark-card border-r border-neutral-200 dark:border-dark-border p-6 overflow-y-auto">
        
        <!-- Personal Information -->
        <div v-if="activeSection === 'personal'" class="space-y-4">
          <h2 class="text-lg font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-dark-border pb-2">Personal Details</h2>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-neutral-500 mb-1">Full Name:</label>
              <input v-model="cv.basics.name" @input="triggerAutosave" type="text" class="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-medium text-neutral-500 mb-1">Job Title:</label>
              <input v-model="cv.basics.label" @input="triggerAutosave" type="text" class="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-neutral-500 mb-1">Email Address:</label>
              <input v-model="cv.basics.email" @input="triggerAutosave" type="email" class="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-medium text-neutral-500 mb-1">Phone Number:</label>
              <input v-model="cv.basics.phone" @input="triggerAutosave" type="text" class="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-neutral-500 mb-1">Location:</label>
            <input v-model="cv.basics.location" @input="triggerAutosave" type="text" class="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
          </div>

          <div>
            <label class="block text-xs font-medium text-neutral-500 mb-1">Professional Summary:</label>
            <textarea v-model="cv.basics.summary" @input="triggerAutosave" rows="4" class="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none"></textarea>
          </div>
        </div>

        <!-- Work Experience Editor -->
        <div v-if="activeSection === 'work'" class="space-y-4">
          <div class="flex items-center justify-between border-b border-neutral-200 dark:border-dark-border pb-2">
            <h2 class="text-lg font-bold text-neutral-900 dark:text-white">Work Experience</h2>
            <button @click="addWorkExperience" class="px-3 py-1 bg-brand-orange text-white text-xs font-semibold rounded-lg flex items-center gap-1">
              <Plus class="w-3.5 h-3.5" /> Add Job
            </button>
          </div>

          <div v-for="(job, index) in cv.work" :key="job.id" class="p-4 rounded-xl border border-neutral-200 dark:border-dark-border space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-xs font-bold text-brand-orange">Position #{{ index + 1 }}</span>
              <button @click="removeWork(index)" class="text-red-500 hover:text-red-700 text-xs font-semibold">Remove</button>
            </div>
            
            <div class="grid grid-cols-2 gap-3">
              <input v-model="job.company" @input="triggerAutosave" placeholder="Company Name" type="text" class="px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg" />
              <input v-model="job.position" @input="triggerAutosave" placeholder="Job Position" type="text" class="px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg" />
            </div>
          </div>
        </div>

      </main>

      <!-- Column 3: Live A4 Document Preview -->
      <section class="hidden lg:flex flex-grow bg-neutral-200 dark:bg-neutral-900 p-8 overflow-y-auto items-start justify-center">
        <div class="w-[210mm] max-w-full">
          <LiveA4Preview :cv="cv" />
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, Eye, Download, User, Briefcase, GraduationCap, Wrench, Plus } from '@lucide/vue'
import LiveA4Preview from '@/components/cv/LiveA4Preview.vue'
import { defaultCVData, type CVData } from '@/types/cv'

const cv = ref<CVData>({ ...defaultCVData })
const activeSection = ref('personal')
const saveStatus = ref<'saved' | 'saving' | 'error'>('saved')

const sections = [
  { id: 'personal', name: 'Personal Details', icon: User },
  { id: 'work', name: 'Work Experience', icon: Briefcase },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'skills', name: 'Skills & Tools', icon: Wrench },
]

let autosaveTimer: any = null
const triggerAutosave = () => {
  saveStatus.value = 'saving'
  clearTimeout(autosaveTimer)
  autosaveTimer = setTimeout(() => {
    saveStatus.value = 'saved'
  }, 1000)
}

const addWorkExperience = () => {
  cv.value.work.push({
    id: Date.now().toString(),
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    highlights: ['']
  })
  triggerAutosave()
}

const removeWork = (index: number) => {
  cv.value.work.splice(index, 1)
  triggerAutosave()
}
</script>
