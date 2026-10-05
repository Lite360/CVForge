<template>
  <section id="templates" class="py-24 bg-neutral-50 dark:bg-dark-secondary/50 border-b border-neutral-100 dark:border-dark-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="text-xs font-bold text-brand-orange uppercase tracking-wider">Template Gallery</span>
        <h2 class="mt-2 text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight">
          Recruiter-Approved CV Templates
        </h2>
        <p class="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Start with a professionally designed template optimized for ATS systems and hiring managers. Free and premium options available.
        </p>
      </div>

      <!-- Templates Preview Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="template in showcaseTemplates"
          :key="template.name"
          class="group rounded-2xl overflow-hidden border border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-card hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Template Visual Preview -->
          <div class="relative h-56 overflow-hidden">
            <div :class="['absolute inset-0 bg-gradient-to-br', template.gradient]"></div>
            
            <!-- Mock CV Lines -->
            <div class="absolute inset-5 flex flex-col gap-2.5 opacity-40">
              <div class="w-2/3 h-3.5 bg-white/30 rounded-full"></div>
              <div class="w-2/5 h-2 bg-white/20 rounded-full"></div>
              <div class="w-full h-px bg-white/20 mt-3 mb-1"></div>
              <div class="w-full h-2 bg-white/15 rounded-full"></div>
              <div class="w-5/6 h-2 bg-white/15 rounded-full"></div>
              <div class="w-4/6 h-2 bg-white/15 rounded-full"></div>
              <div class="w-full h-px bg-white/20 mt-3 mb-1"></div>
              <div class="w-full h-2 bg-white/15 rounded-full"></div>
              <div class="w-3/4 h-2 bg-white/15 rounded-full"></div>
              <div class="w-1/2 h-2 bg-white/15 rounded-full"></div>
            </div>

            <!-- Premium Badge -->
            <div v-if="template.isPremium" class="absolute top-3 right-3">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/90 text-white text-xs font-bold rounded-lg backdrop-blur-sm shadow-md">
                <Crown class="w-3 h-3" />
                Premium
              </span>
            </div>

            <!-- Hover CTA -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <router-link 
                to="/register"
                class="px-5 py-2.5 bg-white text-neutral-900 text-sm font-bold rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 hover:bg-neutral-100"
              >
                <Sparkles class="w-4 h-4" />
                Use Template
              </router-link>
            </div>
          </div>

          <!-- Template Info -->
          <div class="p-5">
            <h3 class="font-bold text-base text-neutral-900 dark:text-white mb-1">{{ template.name }}</h3>
            <p class="text-xs text-neutral-500 leading-relaxed">{{ template.description }}</p>
            
            <!-- Feature Tags -->
            <div class="flex flex-wrap gap-1.5 mt-3">
              <span
                v-for="tag in template.tags"
                :key="tag"
                class="px-2 py-0.5 bg-neutral-100 dark:bg-dark-secondary text-neutral-600 dark:text-neutral-400 text-xs font-medium rounded-md"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- View All CTA -->
      <div class="text-center mt-12">
        <router-link 
          to="/register" 
          class="inline-flex items-center gap-2 px-6 py-3 border border-neutral-300 dark:border-dark-border rounded-xl text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-dark-card transition-all"
        >
          <LayoutTemplate class="w-4 h-4" />
          View All Templates
          <ArrowRight class="w-4 h-4" />
        </router-link>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { Crown, Sparkles, LayoutTemplate, ArrowRight } from '@lucide/vue'

const showcaseTemplates = [
  {
    name: 'Professional ATS',
    description: 'Clean, ATS-optimized layout designed to pass automated screening systems with high success.',
    gradient: 'from-slate-700 to-slate-900',
    isPremium: false,
    tags: ['ATS Optimized', 'Clean Layout', 'All Industries']
  },
  {
    name: 'Executive Modern',
    description: 'Sophisticated design for senior professionals and leadership roles with a commanding presence.',
    gradient: 'from-neutral-800 to-zinc-900',
    isPremium: true,
    tags: ['Executive', 'Leadership', 'Impact Focus']
  },
  {
    name: 'Tech Developer',
    description: 'Developer-focused template with skills matrix, project showcases, and technical highlights.',
    gradient: 'from-indigo-600 to-violet-700',
    isPremium: false,
    tags: ['Skills Matrix', 'Projects', 'Tech Focus']
  }
]
</script>
