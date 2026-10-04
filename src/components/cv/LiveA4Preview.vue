<template>
  <div class="bg-white text-neutral-900 p-8 sm:p-12 shadow-2xl rounded-sm border border-neutral-200 aspect-[1/1.414] max-w-full overflow-hidden cv-document-preview text-left text-sm leading-relaxed">
    
    <!-- Header / Contact Information -->
    <div class="border-b-2 border-neutral-900 pb-4 mb-6 text-center">
      <h1 class="text-2xl font-bold uppercase tracking-wide text-neutral-900">
        {{ cv.basics.name || 'YOUR NAME' }}
      </h1>
      <p class="text-base font-semibold text-neutral-700 mt-0.5">
        {{ cv.basics.label || 'Professional Title' }}
      </p>
      
      <div class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-neutral-600 mt-2">
        <span v-if="cv.basics.email">{{ cv.basics.email }}</span>
        <span v-if="cv.basics.email && cv.basics.phone">•</span>
        <span v-if="cv.basics.phone">{{ cv.basics.phone }}</span>
        <span v-if="cv.basics.phone && cv.basics.location">•</span>
        <span v-if="cv.basics.location">{{ cv.basics.location }}</span>
        <span v-if="cv.basics.location && cv.basics.url">•</span>
        <span v-if="cv.basics.url">{{ cv.basics.url }}</span>
      </div>
    </div>

    <!-- Summary Section -->
    <div v-if="cv.basics.summary" class="mb-6">
      <h2 class="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
        Professional Summary
      </h2>
      <p class="text-xs text-neutral-800 leading-normal">
        {{ cv.basics.summary }}
      </p>
    </div>

    <!-- Work Experience Section -->
    <div v-if="cv.work.length > 0" class="mb-6">
      <h2 class="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
        Work Experience
      </h2>
      
      <div v-for="job in cv.work" :key="job.id" class="mb-4">
        <div class="flex justify-between items-baseline font-bold text-xs">
          <span>{{ job.position }} — {{ job.company }}</span>
          <span class="text-neutral-600 font-normal">
            {{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}
          </span>
        </div>
        
        <ul class="list-disc list-inside text-xs text-neutral-800 mt-1 space-y-1">
          <li v-for="(bullet, index) in job.highlights" :key="index">
            {{ bullet }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Education Section -->
    <div v-if="cv.education.length > 0" class="mb-6">
      <h2 class="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
        Education
      </h2>
      
      <div v-for="edu in cv.education" :key="edu.id" class="flex justify-between items-baseline text-xs mb-2">
        <div>
          <span class="font-bold">{{ edu.studyType }} in {{ edu.area }}</span>
          <span class="text-neutral-700">, {{ edu.institution }}</span>
        </div>
        <span class="text-neutral-600">{{ edu.startDate }} - {{ edu.endDate }}</span>
      </div>
    </div>

    <!-- Skills Section -->
    <div v-if="cv.skills.length > 0" class="mb-4">
      <h2 class="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
        Key Skills
      </h2>
      <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-800">
        <span v-for="skill in cv.skills" :key="skill.id">
          <strong>{{ skill.name }}</strong> ({{ skill.level }})
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
