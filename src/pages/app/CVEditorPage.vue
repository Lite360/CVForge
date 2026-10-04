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
        <button @click="togglePreview" class="px-3.5 py-1.5 border border-neutral-300 dark:border-dark-border rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-dark-secondary flex items-center gap-1.5">
          <Eye class="w-4 h-4" /> {{ showMobilePreview ? 'Edit' : 'Preview' }}
        </button>
        <button @click="exportPDF" :disabled="isExporting" class="px-4 py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg text-xs font-semibold shadow-sm transition flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-wait">
          <Download v-if="!isExporting" class="w-4 h-4" />
          <LoaderCircle v-else class="w-4 h-4 animate-spin" />
          {{ isExporting ? 'Generating...' : 'Export PDF' }}
        </button>
        <button @click="exportDOCX" class="px-4 py-1.5 border border-neutral-300 dark:border-dark-border rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-dark-secondary flex items-center gap-1.5 hidden sm:flex">
          <FileText class="w-4 h-4" /> DOCX
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
      <main v-show="!showMobilePreview" class="w-full md:w-1/2 lg:w-5/12 bg-white dark:bg-dark-card border-r border-neutral-200 dark:border-dark-border p-6 overflow-y-auto">
        
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

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-neutral-500 mb-1">Location:</label>
              <input v-model="cv.basics.location" @input="triggerAutosave" type="text" class="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-medium text-neutral-500 mb-1">Website / LinkedIn:</label>
              <input v-model="cv.basics.url" @input="triggerAutosave" type="url" class="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
            </div>
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
              <button @click="removeWork(index)" class="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1">
                <Trash2 class="w-3 h-3" /> Remove
              </button>
            </div>
            
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-neutral-500 mb-1">Company:</label>
                <input v-model="job.company" @input="triggerAutosave" type="text" class="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-medium text-neutral-500 mb-1">Position:</label>
                <input v-model="job.position" @input="triggerAutosave" type="text" class="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-neutral-500 mb-1">Start Date:</label>
                <input v-model="job.startDate" @input="triggerAutosave" type="month" class="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-medium text-neutral-500 mb-1">End Date:</label>
                <input v-model="job.endDate" @input="triggerAutosave" type="month" :disabled="job.current" class="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none disabled:opacity-50" />
                <label class="flex items-center gap-1.5 mt-1.5 cursor-pointer">
                  <input v-model="job.current" @change="triggerAutosave" type="checkbox" class="accent-brand-orange w-3.5 h-3.5" />
                  <span class="text-xs text-neutral-500">Currently working here</span>
                </label>
              </div>
            </div>

            <!-- Highlights / Bullet points -->
            <div>
              <label class="block text-xs font-medium text-neutral-500 mb-1">Key Achievements:</label>
              <div v-for="(highlight, hIndex) in job.highlights" :key="hIndex" class="flex items-center gap-2 mb-2">
                <span class="text-neutral-400 text-xs">•</span>
                <input v-model="job.highlights[hIndex]" @input="triggerAutosave" type="text" class="flex-grow px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" placeholder="Describe an achievement..." />
                <button @click="job.highlights.splice(hIndex, 1); triggerAutosave()" class="text-red-400 hover:text-red-600 text-xs p-1"><X class="w-3 h-3" /></button>
              </div>
              <button @click="job.highlights.push(''); triggerAutosave()" class="text-xs text-brand-orange hover:underline flex items-center gap-1 mt-1">
                <Plus class="w-3 h-3" /> Add Bullet Point
              </button>
            </div>
          </div>

          <div v-if="cv.work.length === 0" class="text-center py-8 text-neutral-400 text-sm">
            No work experience added yet. Click "Add Job" to get started.
          </div>
        </div>

        <!-- Education Editor -->
        <div v-if="activeSection === 'education'" class="space-y-4">
          <div class="flex items-center justify-between border-b border-neutral-200 dark:border-dark-border pb-2">
            <h2 class="text-lg font-bold text-neutral-900 dark:text-white">Education</h2>
            <button @click="addEducation" class="px-3 py-1 bg-brand-orange text-white text-xs font-semibold rounded-lg flex items-center gap-1">
              <Plus class="w-3.5 h-3.5" /> Add Education
            </button>
          </div>

          <div v-for="(edu, index) in cv.education" :key="edu.id" class="p-4 rounded-xl border border-neutral-200 dark:border-dark-border space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-xs font-bold text-brand-orange">Education #{{ index + 1 }}</span>
              <button @click="cv.education.splice(index, 1); triggerAutosave()" class="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1">
                <Trash2 class="w-3 h-3" /> Remove
              </button>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-neutral-500 mb-1">Institution:</label>
                <input v-model="edu.institution" @input="triggerAutosave" type="text" class="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-medium text-neutral-500 mb-1">Degree Type:</label>
                <input v-model="edu.studyType" @input="triggerAutosave" type="text" placeholder="e.g. Bachelor of Science" class="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-neutral-500 mb-1">Field of Study:</label>
              <input v-model="edu.area" @input="triggerAutosave" type="text" placeholder="e.g. Computer Science" class="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-neutral-500 mb-1">Start Date:</label>
                <input v-model="edu.startDate" @input="triggerAutosave" type="month" class="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-medium text-neutral-500 mb-1">End Date:</label>
                <input v-model="edu.endDate" @input="triggerAutosave" type="month" class="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
              </div>
            </div>
          </div>

          <div v-if="cv.education.length === 0" class="text-center py-8 text-neutral-400 text-sm">
            No education entries yet. Click "Add Education" above.
          </div>
        </div>

        <!-- Skills Editor -->
        <div v-if="activeSection === 'skills'" class="space-y-4">
          <div class="flex items-center justify-between border-b border-neutral-200 dark:border-dark-border pb-2">
            <h2 class="text-lg font-bold text-neutral-900 dark:text-white">Skills &amp; Tools</h2>
            <button @click="addSkill" class="px-3 py-1 bg-brand-orange text-white text-xs font-semibold rounded-lg flex items-center gap-1">
              <Plus class="w-3.5 h-3.5" /> Add Skill
            </button>
          </div>

          <div v-for="(skill, index) in cv.skills" :key="skill.id" class="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 dark:border-dark-border">
            <div class="flex-grow grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-neutral-500 mb-1">Skill Name:</label>
                <input v-model="skill.name" @input="triggerAutosave" type="text" class="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-medium text-neutral-500 mb-1">Level:</label>
                <select v-model="skill.level" @change="triggerAutosave" class="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-dark-border dark:bg-dark-bg focus:ring-1 focus:ring-brand-orange focus:outline-none">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>
            <button @click="cv.skills.splice(index, 1); triggerAutosave()" class="text-red-400 hover:text-red-600 p-1.5 mt-4">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>

          <div v-if="cv.skills.length === 0" class="text-center py-8 text-neutral-400 text-sm">
            No skills added yet. Click "Add Skill" above.
          </div>
        </div>

      </main>

      <!-- Column 3: Live A4 Document Preview -->
      <section :class="[showMobilePreview ? 'flex' : 'hidden lg:flex']" class="flex-grow bg-neutral-200 dark:bg-neutral-900 p-8 overflow-y-auto items-start justify-center">
        <div class="w-[210mm] max-w-full">
          <LiveA4Preview ref="previewRef" :cv="cv" />
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, Eye, Download, FileText, User, Briefcase, GraduationCap, Wrench, Plus, Trash2, X, LoaderCircle } from '@lucide/vue'
import html2pdf from 'html2pdf.js'
import LiveA4Preview from '@/components/cv/LiveA4Preview.vue'
import { defaultCVData, type CVData } from '@/types/cv'

const cv = ref<CVData>({ ...defaultCVData })
const activeSection = ref('personal')
const saveStatus = ref<'saved' | 'saving' | 'error'>('saved')
const isExporting = ref(false)
const showMobilePreview = ref(false)
const previewRef = ref<InstanceType<typeof LiveA4Preview> | null>(null)

const sections = [
  { id: 'personal', name: 'Personal Details', icon: User },
  { id: 'work', name: 'Work Experience', icon: Briefcase },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'skills', name: 'Skills & Tools', icon: Wrench },
]

// --- Autosave ---
let autosaveTimer: any = null
const triggerAutosave = () => {
  saveStatus.value = 'saving'
  clearTimeout(autosaveTimer)
  autosaveTimer = setTimeout(() => {
    saveStatus.value = 'saved'
  }, 1000)
}

// --- Work Experience ---
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

// --- Education ---
const addEducation = () => {
  cv.value.education.push({
    id: Date.now().toString(),
    institution: '',
    area: '',
    studyType: '',
    startDate: '',
    endDate: ''
  })
  triggerAutosave()
}

// --- Skills ---
const addSkill = () => {
  cv.value.skills.push({
    id: Date.now().toString(),
    name: '',
    level: 'Intermediate'
  })
  triggerAutosave()
}

// --- Mobile Preview Toggle ---
const togglePreview = () => {
  showMobilePreview.value = !showMobilePreview.value
}

// --- PDF Export (PRD #24) ---
const exportPDF = async () => {
  const previewEl = previewRef.value?.$el as HTMLElement | undefined
  if (!previewEl) return

  isExporting.value = true

  try {
    const filename = cv.value.title
      ? `${cv.value.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
      : 'CVForge_CV.pdf'

    await html2pdf()
      .set({
        margin: 0,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      })
      .from(previewEl)
      .save()
  } catch (err) {
    console.error('PDF export failed:', err)
  } finally {
    isExporting.value = false
  }
}

// --- DOCX Export placeholder (Premium feature per PRD) ---
const exportDOCX = () => {
  alert('DOCX export is a Premium feature. Upgrade your plan to unlock it.')
}
</script>
