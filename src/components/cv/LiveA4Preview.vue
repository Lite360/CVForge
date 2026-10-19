<template>
  <div 
    class="bg-white p-4 sm:p-8 md:p-10 text-neutral-900 shadow-xl sm:shadow-2xl rounded-sm border border-neutral-200 w-full min-h-[auto] sm:min-h-[297mm] overflow-hidden cv-document-preview text-left text-xs sm:text-sm leading-relaxed font-cv"
  >
    
    <!-- ─── TEMPLATE 1: Executive Modern (Two-Column) ─── -->
    <div v-if="templateVariant === 'executive-modern'" class="space-y-4 sm:space-y-6">
      
      <!-- Top Title Header -->
      <div class="border-b-2 border-neutral-900 pb-3 sm:pb-4 text-center">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wider text-neutral-900 break-words">
          {{ cv.basics.label || 'PROFESSIONAL TITLE' }}
        </h1>
        <p class="text-sm sm:text-base font-bold text-neutral-800 mt-0.5 uppercase tracking-wide">
          {{ cv.basics.name || 'YOUR NAME' }}
        </p>
        
        <div class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] sm:text-xs text-neutral-600 mt-2">
          <span v-if="cv.basics.phone">{{ cv.basics.phone }}</span>
          <span v-if="cv.basics.email">• {{ cv.basics.email }}</span>
          <span v-if="cv.basics.location">• {{ cv.basics.location }}</span>
          <span v-if="cv.basics.url">• {{ cv.basics.url }}</span>
        </div>
      </div>

      <!-- Professional Summary Banner -->
      <div v-if="cv.basics.summary" class="space-y-1">
        <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1">
          Professional Summary
        </h2>
        <p class="text-[11px] sm:text-xs text-neutral-800 leading-relaxed text-justify sm:text-left">
          {{ cv.basics.summary }}
        </p>
      </div>

      <!-- 2-Column Responsive Body Layout (Main Experience vs Side Skills) -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
        
        <!-- Left / Main Column: Experience & Education (7 cols) -->
        <div class="md:col-span-7 space-y-5">
          <!-- Work Experience -->
          <div v-if="cv.work.length > 0">
            <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
              Professional Experience
            </h2>
            
            <div v-for="job in cv.work" :key="job.id" class="mb-4">
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-xs gap-0.5">
                <span class="text-neutral-900">{{ job.position }}</span>
                <span class="text-neutral-500 font-normal text-[10px] sm:text-[11px]">
                  {{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}
                </span>
              </div>
              <div class="text-[11px] font-semibold text-neutral-700">{{ job.company }}</div>
              
              <ul class="list-disc list-inside text-[11px] text-neutral-800 mt-1 space-y-1">
                <li v-for="(bullet, index) in job.highlights" :key="index" class="leading-relaxed">
                  {{ bullet }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Education -->
          <div v-if="cv.education.length > 0">
            <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Education
            </h2>
            
            <div v-for="edu in cv.education" :key="edu.id" class="text-[11px] mb-2">
              <div class="font-bold text-neutral-900">{{ edu.studyType }} in {{ edu.area }}</div>
              <div class="text-neutral-600 flex justify-between">
                <span>{{ edu.institution }}</span>
                <span class="italic text-[10px]">{{ edu.startDate }} - {{ edu.endDate }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right / Sidebar Column: Skills, Technical, Languages (5 cols) -->
        <div class="md:col-span-5 space-y-5 md:border-l md:border-neutral-200 md:pl-5">
          
          <!-- Soft Skills -->
          <div v-if="cv.skills.length > 0">
            <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Soft Skills
            </h2>
            <ul class="list-disc list-inside text-[11px] text-neutral-800 space-y-1">
              <li v-for="skill in cv.skills.slice(0, Math.ceil(cv.skills.length / 2))" :key="skill.id">{{ skill.name }}</li>
            </ul>
          </div>

          <!-- Technical Skills -->
          <div v-if="cv.skills.length > 0">
            <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Technical Skills
            </h2>
            <div class="flex flex-wrap gap-1.5 text-[11px] text-neutral-800">
              <span v-for="skill in cv.skills.slice(Math.ceil(cv.skills.length / 2))" :key="skill.id" class="px-2 py-0.5 bg-neutral-100 rounded text-neutral-900 font-medium">
                {{ skill.name }}
              </span>
            </div>
          </div>

          <!-- Languages -->
          <div>
            <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Languages
            </h2>
            <div class="text-[11px] text-neutral-700 space-y-1">
              <div class="flex justify-between"><span>English:</span><span class="font-semibold">Native / Fluent</span></div>
            </div>
          </div>

        </div>

      </div>

    </div>

    <!-- ─── TEMPLATE 2: Compact ATS (Dense Single-Page) ─── -->
    <div v-else-if="templateVariant === 'compact-ats'" class="space-y-3 sm:space-y-4">

      <!-- Header -->
      <div class="text-center pb-2 border-b-2 border-neutral-900">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-neutral-900 break-words">
          {{ cv.basics.name || 'YOUR NAME' }}
        </h1>
        <div class="flex flex-wrap items-center justify-center gap-x-1 text-[11px] sm:text-xs text-neutral-600 mt-1">
          <span v-if="cv.basics.email" class="break-all">{{ cv.basics.email }}</span>
          <span v-if="cv.basics.email && cv.basics.phone"> | </span>
          <span v-if="cv.basics.phone">{{ cv.basics.phone }}</span>
          <span v-if="cv.basics.phone && cv.basics.location"> | </span>
          <span v-if="cv.basics.location">{{ cv.basics.location }}</span>
          <span v-if="cv.basics.location && cv.basics.url"> | </span>
          <span v-if="cv.basics.url" class="break-all">{{ cv.basics.url }}</span>
        </div>
      </div>

      <!-- Professional Summary -->
      <div v-if="cv.basics.summary">
        <h2 class="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-400 pb-0.5 mb-1.5">
          Professional Summary
        </h2>
        <p class="text-[11px] sm:text-xs text-neutral-800 leading-relaxed text-justify">
          {{ cv.basics.summary }}
        </p>
      </div>

      <!-- Core Skills (Pipe-separated) -->
      <div v-if="cv.skills.length > 0">
        <h2 class="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-400 pb-0.5 mb-1.5">
          Core Skills
        </h2>
        <p class="text-[11px] sm:text-xs text-neutral-800 leading-relaxed">
          {{ cv.skills.map(s => s.name).join(' | ') }}
        </p>
      </div>

      <!-- Professional Experience -->
      <div v-if="cv.work.length > 0">
        <h2 class="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-400 pb-0.5 mb-2">
          Professional Experience
        </h2>
        
        <div v-for="job in cv.work" :key="job.id" class="mb-3">
          <div class="text-[11px] sm:text-xs font-bold text-neutral-900">
            {{ job.company }}<span v-if="job.position"> | {{ job.position }}</span>
            <span class="font-normal text-neutral-500"> | {{ job.startDate }} – {{ job.current ? 'Present' : job.endDate }}</span>
          </div>
          <ul class="list-none text-[11px] text-neutral-800 mt-0.5 space-y-0.5">
            <li v-for="(bullet, index) in job.highlights" :key="index" class="leading-relaxed pl-3 relative before:content-['-'] before:absolute before:left-0 before:text-neutral-500">
              {{ bullet }}
            </li>
          </ul>
        </div>
      </div>

      <!-- NYSC Leadership & Service (shows as extra experience) -->
      <div>
        <h2 class="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-400 pb-0.5 mb-1.5">
          NYSC Leadership &amp; Service
        </h2>
        <p class="text-[11px] text-neutral-500 italic">Add NYSC experience under Work Experience section</p>
      </div>

      <!-- Education -->
      <div v-if="cv.education.length > 0">
        <h2 class="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-400 pb-0.5 mb-1.5">
          Education
        </h2>
        <div v-for="edu in cv.education" :key="edu.id" class="text-[11px] sm:text-xs mb-1.5">
          <div class="font-bold text-neutral-900">
            {{ edu.institution }}
            <span class="font-normal text-neutral-600"> | {{ edu.studyType }} in {{ edu.area }} | {{ edu.endDate }}</span>
          </div>
        </div>
      </div>

      <!-- Certifications & Training -->
      <div>
        <h2 class="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-400 pb-0.5 mb-1.5">
          Certifications &amp; Training
        </h2>
        <p class="text-[11px] text-neutral-500 italic">Add certifications under Skills section</p>
      </div>

    </div>

    <!-- ─── TEMPLATE 3: Classic Detailed (Icon Contact, Categorized Skills, References) ─── -->
    <div v-else class="space-y-4 sm:space-y-5">

      <!-- Header -->
      <div class="text-center pb-1">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-neutral-900 break-words" style="font-family: 'Georgia', 'Times New Roman', serif;">
          {{ cv.basics.name || 'YOUR NAME' }}
        </h1>
        <p class="text-sm sm:text-base font-semibold uppercase text-neutral-700 tracking-wider mt-0.5">
          {{ cv.basics.label || 'Professional Title' }}
        </p>
        <div class="border-t border-neutral-400 mt-2 pt-2">
          <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-neutral-600">
            <span v-if="cv.basics.phone" class="inline-flex items-center gap-1">📞 {{ cv.basics.phone }}</span>
            <span v-if="cv.basics.email" class="inline-flex items-center gap-1">✉️ {{ cv.basics.email }}</span>
            <span v-if="cv.basics.location" class="inline-flex items-center gap-1">📍 {{ cv.basics.location }}</span>
            <span v-if="cv.basics.url" class="inline-flex items-center gap-1 break-all">🔗 {{ cv.basics.url }}</span>
          </div>
        </div>
      </div>

      <!-- Professional Summary -->
      <div v-if="cv.basics.summary">
        <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-400 pb-1 mb-2">
          Professional Summary
        </h2>
        <p class="text-[11px] sm:text-xs text-neutral-800 leading-relaxed text-justify sm:text-left">
          {{ cv.basics.summary }}
        </p>
      </div>

      <!-- Skills (Categorized) -->
      <div v-if="cv.skills.length > 0">
        <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-400 pb-1 mb-2">
          Skills
        </h2>
        <div class="text-[11px] sm:text-xs text-neutral-800 space-y-1">
          <div v-if="dataSkills.length > 0">
            <span class="font-bold">Data & Operations:</span> {{ dataSkills.map(s => s.name).join(', ') }}
          </div>
          <div v-if="digitalSkills.length > 0">
            <span class="font-bold">Digital:</span> {{ digitalSkills.map(s => s.name).join(', ') }}
          </div>
          <div v-if="professionalSkills.length > 0">
            <span class="font-bold">Professional:</span> {{ professionalSkills.map(s => s.name).join(', ') }}
          </div>
          <!-- Fallback if no categorized skills, show all -->
          <div v-if="dataSkills.length === 0 && digitalSkills.length === 0 && professionalSkills.length === 0">
            {{ cv.skills.map(s => s.name).join(', ') }}
          </div>
        </div>
      </div>

      <!-- Professional Experience -->
      <div v-if="cv.work.length > 0">
        <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-400 pb-1 mb-3">
          Professional Experience
        </h2>
        
        <div v-for="job in cv.work" :key="job.id" class="mb-4">
          <div class="font-bold text-xs text-neutral-900">
            {{ job.company }} – {{ cv.basics.location || '' }}
            <span class="font-normal text-neutral-500"> | {{ job.startDate }} – {{ job.current ? 'Present' : job.endDate }}</span>
          </div>
          <div class="text-[11px] italic text-neutral-700">{{ job.position }}</div>
          
          <ul class="list-disc list-outside ml-4 text-[11px] text-neutral-800 mt-1 space-y-1">
            <li v-for="(bullet, index) in job.highlights" :key="index" class="leading-relaxed">
              {{ bullet }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Education -->
      <div v-if="cv.education.length > 0">
        <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-400 pb-1 mb-2">
          Education
        </h2>
        
        <div v-for="edu in cv.education" :key="edu.id" class="text-[11px] sm:text-xs mb-2">
          <div class="font-bold text-neutral-900">
            {{ edu.studyType }} in {{ edu.area }}
            <span class="font-normal text-neutral-600"> | {{ edu.institution }} | {{ edu.endDate }}</span>
          </div>
        </div>
      </div>

      <!-- Additional Information -->
      <div>
        <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-400 pb-1 mb-2">
          Additional Information
        </h2>
        <p class="text-[11px] text-neutral-600 italic">Add your interests, volunteer work, or other relevant information.</p>
      </div>

      <!-- References -->
      <div>
        <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-400 pb-1 mb-2">
          References
        </h2>
        <p class="text-[11px] sm:text-xs text-neutral-800">Available upon request.</p>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CVData } from '@/types/cv'

const props = defineProps<{
  cv: CVData
}>()

const templateVariant = computed(() => {
  const tid = props.cv.templateId?.toLowerCase() || ''
  if (tid.includes('executive') || tid.includes('modern')) return 'executive-modern'
  if (tid.includes('compact') || tid.includes('ats')) return 'compact-ats'
  return 'classic-detailed'
})

// Categorize skills for classic-detailed template
const dataSkills = computed(() =>
  props.cv.skills.filter(s => {
    const n = s.name.toLowerCase()
    return n.includes('data') || n.includes('analysis') || n.includes('sql') || n.includes('excel') || n.includes('operations') || n.includes('python') || n.includes('report')
  })
)

const digitalSkills = computed(() =>
  props.cv.skills.filter(s => {
    const n = s.name.toLowerCase()
    return n.includes('digital') || n.includes('google') || n.includes('seo') || n.includes('marketing') || n.includes('social') || n.includes('cms') || n.includes('jira') || n.includes('analytics')
  })
)

const professionalSkills = computed(() =>
  props.cv.skills.filter(s => {
    const n = s.name.toLowerCase()
    return n.includes('leadership') || n.includes('management') || n.includes('communication') || n.includes('team') || n.includes('problem') || n.includes('presentation') || n.includes('negotiat')
  })
)
</script>
