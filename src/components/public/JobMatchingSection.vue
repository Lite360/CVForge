<template>
  <section id="job-matching" class="py-24 bg-white dark:bg-dark-bg border-b border-neutral-100 dark:border-dark-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Left: Content -->
        <div class="space-y-6">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-bold tracking-wide">
            <Target class="w-3.5 h-3.5" />
            JOB MATCHING
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight">
            Tailor Every CV to <br />
            <span class="text-gradient-orange">the Exact Job You Want.</span>
          </h2>

          <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Paste a job description and CVForge shows exactly how your CV matches. See missing skills, keyword gaps, and get specific recommendations to improve your chances.
          </p>

          <ul class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
            <li class="flex items-center gap-2.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              Match percentage score
            </li>
            <li class="flex items-center gap-2.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              Matching & missing skill comparison
            </li>
            <li class="flex items-center gap-2.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              Keyword gap analysis
            </li>
            <li class="flex items-center gap-2.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              Experience & title alignment
            </li>
            <li class="flex items-center gap-2.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              Direct link to AI Optimizer for fixes
            </li>
          </ul>

          <div class="pt-4">
            <router-link to="/register" class="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95">
              <Target class="w-5 h-5" />
              Match My CV to a Job
            </router-link>
          </div>
        </div>

        <!-- Right: Visual Demo -->
        <div class="bg-neutral-50 dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border p-6 sm:p-8 space-y-6">
          
          <!-- Match Score Header -->
          <div class="text-center">
            <div class="inline-flex items-center gap-3 px-5 py-3 bg-white dark:bg-dark-secondary rounded-xl border border-neutral-200 dark:border-dark-border">
              <div class="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <Target class="w-5 h-5" />
              </div>
              <div class="text-left">
                <span class="text-xs text-neutral-500 block">Match Score</span>
                <span class="text-2xl font-extrabold text-neutral-900 dark:text-white">73%</span>
              </div>
            </div>
          </div>

          <!-- Matching Skills -->
          <div>
            <h4 class="text-xs font-bold uppercase text-emerald-600 mb-3">Matching Skills (6)</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in matchingSkills" :key="skill" class="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-lg border border-emerald-200 dark:border-emerald-800">
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Missing Skills -->
          <div>
            <h4 class="text-xs font-bold uppercase text-red-600 mb-3">Missing Skills (4)</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in missingSkills" :key="skill" class="px-2.5 py-1 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-xs font-medium rounded-lg border border-red-200 dark:border-red-800">
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="h-px bg-neutral-200 dark:bg-dark-border"></div>

          <!-- Recommendation -->
          <div class="flex items-start gap-3 text-xs text-neutral-600 dark:text-neutral-400">
            <Lightbulb class="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p>Add <strong>Docker</strong> and <strong>Kubernetes</strong> to your skills section and mention CI/CD experience to boost your match to ~87%.</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Target, CheckCircle2, Lightbulb } from '@lucide/vue'

const matchingSkills = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Git']
const missingSkills = ['Docker', 'Kubernetes', 'CI/CD', 'AWS']
</script>
