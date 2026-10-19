<template>
  <div 
    :class="[
      isExecutiveModern ? 'bg-white p-4 sm:p-8 md:p-10' : 'bg-white p-4 sm:p-8 md:p-12',
    ]"
    class="text-neutral-900 shadow-xl sm:shadow-2xl rounded-sm border border-neutral-200 w-full min-h-[auto] sm:min-h-[297mm] overflow-hidden cv-document-preview text-left text-xs sm:text-sm leading-relaxed font-cv"
  >
    
    <!-- ─── TEMPLATE VARIANT A: Two-Column Modern (Sales Rep / Executive style from screenshot) ─── -->
    <div v-if="isExecutiveModern" class="space-y-4 sm:space-y-6">
      
      <!-- Top Title Header -->
      <div class="border-b-2 border-neutral-900 pb-3 sm:pb-4 text-center">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wider text-neutral-900 break-words">
          {{ cv.basics.label || 'SALES REPRESENTATIVE' }}
        </h1>
        <p class="text-sm sm:text-base font-bold text-neutral-800 mt-0.5 uppercase tracking-wide">
          {{ cv.basics.name || 'FANNY COOPER' }}
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
          <div>
            <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Soft Skills
            </h2>
            <ul class="list-disc list-inside text-[11px] text-neutral-800 space-y-1">
              <li>Analytical Thinking & Problem Solving</li>
              <li>Adaptability & Fast Learning</li>
              <li>Negotiation & Client Relations</li>
              <li>Team Leadership & Collaboration</li>
            </ul>
          </div>

          <!-- Technical Skills -->
          <div v-if="cv.skills.length > 0">
            <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Technical Skills
            </h2>
            <div class="flex flex-wrap gap-1.5 text-[11px] text-neutral-800">
              <span v-for="skill in cv.skills" :key="skill.id" class="px-2 py-0.5 bg-neutral-100 rounded text-neutral-900 font-medium">
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
              <div class="flex justify-between"><span>Spanish:</span><span class="font-semibold">Professional Working</span></div>
            </div>
          </div>

        </div>

      </div>

    </div>

    <!-- ─── TEMPLATE VARIANT B: Classic Professional ATS (Single Column) ─── -->
    <div v-else class="space-y-4 sm:space-y-6">
      <!-- Header / Contact Information -->
      <div class="border-b-2 border-neutral-900 pb-3 sm:pb-4 text-center">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-neutral-900 break-words">
          {{ cv.basics.name || 'YOUR NAME' }}
        </h1>
        <p class="text-sm sm:text-base font-semibold text-neutral-700 mt-0.5">
          {{ cv.basics.label || 'Professional Title' }}
        </p>
        
        <div class="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-[11px] sm:text-xs text-neutral-600 mt-2">
          <span v-if="cv.basics.email" class="break-all">{{ cv.basics.email }}</span>
          <span v-if="cv.basics.email && cv.basics.phone">•</span>
          <span v-if="cv.basics.phone">{{ cv.basics.phone }}</span>
          <span v-if="cv.basics.phone && cv.basics.location">•</span>
          <span v-if="cv.basics.location">{{ cv.basics.location }}</span>
          <span v-if="cv.basics.location && cv.basics.url">•</span>
          <span v-if="cv.basics.url" class="break-all">{{ cv.basics.url }}</span>
        </div>
      </div>

      <!-- Summary Section -->
      <div v-if="cv.basics.summary">
        <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
          Professional Summary
        </h2>
        <p class="text-[11px] sm:text-xs text-neutral-800 leading-relaxed text-justify sm:text-left">
          {{ cv.basics.summary }}
        </p>
      </div>

      <!-- Work Experience Section -->
      <div v-if="cv.work.length > 0">
        <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
          Work Experience
        </h2>
        
        <div v-for="job in cv.work" :key="job.id" class="mb-3 sm:mb-4">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-xs gap-0.5 sm:gap-2">
            <span>{{ job.position }} — {{ job.company }}</span>
            <span class="text-neutral-500 font-normal text-[11px] sm:text-xs">
              {{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}
            </span>
          </div>
          
          <ul class="list-disc list-inside text-[11px] sm:text-xs text-neutral-800 mt-1 space-y-1">
            <li v-for="(bullet, index) in job.highlights" :key="index" class="leading-relaxed">
              {{ bullet }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Education Section -->
      <div v-if="cv.education.length > 0">
        <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
          Education
        </h2>
        
        <div v-for="edu in cv.education" :key="edu.id" class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-[11px] sm:text-xs mb-2 gap-0.5 sm:gap-2">
          <div>
            <span class="font-bold">{{ edu.studyType }} in {{ edu.area }}</span>
            <span class="text-neutral-700">, {{ edu.institution }}</span>
          </div>
          <span class="text-neutral-500 text-[11px]">{{ edu.startDate }} - {{ edu.endDate }}</span>
        </div>
      </div>

      <!-- Skills Section -->
      <div v-if="cv.skills.length > 0">
        <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
          Key Skills
        </h2>
        <div class="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-neutral-800">
          <span v-for="skill in cv.skills" :key="skill.id" class="inline-flex items-center gap-1 bg-neutral-100 sm:bg-transparent px-2 sm:px-0 py-0.5 sm:py-0 rounded">
            <strong>{{ skill.name }}</strong> <span class="text-neutral-500">({{ skill.level }})</span>
          </span>
        </div>
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

const isExecutiveModern = computed(() => {
  const tid = props.cv.templateId?.toLowerCase() || ''
  return tid.includes('modern') || tid.includes('executive') || tid.includes('creative')
})
</script>
