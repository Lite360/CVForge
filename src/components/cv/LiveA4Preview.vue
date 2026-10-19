<template>
  <div class="bg-white text-neutral-900 p-4 sm:p-8 md:p-12 shadow-xl sm:shadow-2xl rounded-sm border border-neutral-200 w-full min-h-[auto] sm:min-h-[297mm] overflow-hidden cv-document-preview text-left text-xs sm:text-sm leading-relaxed font-cv">
    
    <!-- Header / Contact Information -->
    <div class="border-b-2 border-neutral-900 pb-3 sm:pb-4 mb-4 sm:mb-6 text-center">
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
    <div v-if="cv.basics.summary" class="mb-4 sm:mb-6">
      <h2 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
        Professional Summary
      </h2>
      <p class="text-[11px] sm:text-xs text-neutral-800 leading-relaxed text-justify sm:text-left">
        {{ cv.basics.summary }}
      </p>
    </div>

    <!-- Work Experience Section -->
    <div v-if="cv.work.length > 0" class="mb-4 sm:mb-6">
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
    <div v-if="cv.education.length > 0" class="mb-4 sm:mb-6">
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
    <div v-if="cv.skills.length > 0" class="mb-4">
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
</template>

<script setup lang="ts">
import type { CVData } from '@/types/cv'

defineProps<{
  cv: CVData
}>()
</script>
