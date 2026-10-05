<template>
  <section id="features" class="py-24 bg-white dark:bg-dark-bg border-b border-neutral-100 dark:border-dark-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="text-xs font-bold text-brand-orange uppercase tracking-wider">Powerful Features</span>
        <h2 class="mt-2 text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight">
          Everything You Need to Land Your Next Role
        </h2>
        <p class="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
          From professional templates to AI-powered content optimization — CVForge gives you every tool to create CVs that get interviews.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.title"
          class="group p-6 rounded-2xl border border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-card hover:border-brand-orange/40 hover:shadow-lg hover:shadow-brand-orange/5 transition-all duration-300"
        >
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
            :class="feature.iconBg"
          >
            <component :is="feature.icon" class="w-6 h-6" :class="feature.iconColor" />
          </div>
          
          <h3 class="text-base font-bold text-neutral-900 dark:text-white mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { 
  FileText, Wand2, ShieldCheck, Target, Download, 
  LayoutTemplate, Sparkles, Smartphone, Crown 
} from '@lucide/vue'

const features = [
  {
    icon: FileText,
    iconBg: 'bg-orange-100 dark:bg-brand-orange/10',
    iconColor: 'text-brand-orange',
    title: 'CV Builder',
    description: 'Create polished CVs from scratch with a structured, section-by-section editor and real-time A4 live preview.'
  },
  {
    icon: LayoutTemplate,
    iconBg: 'bg-indigo-100 dark:bg-indigo-500/10',
    iconColor: 'text-indigo-600',
    title: 'Professional Templates',
    description: 'Choose from recruiter-approved templates designed for ATS compatibility and visual impact across industries.'
  },
  {
    icon: Wand2,
    iconBg: 'bg-amber-100 dark:bg-amber-500/10',
    iconColor: 'text-amber-600',
    title: 'AI CV Optimizer',
    description: 'Upload your existing CV and get AI-driven content improvements, stronger wording, and keyword optimization.'
  },
  {
    icon: ShieldCheck,
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-600',
    title: 'ATS Compatibility Checker',
    description: 'Score your CV against ATS parsing systems. Get actionable fixes for formatting, keywords, and structure.'
  },
  {
    icon: Target,
    iconBg: 'bg-rose-100 dark:bg-rose-500/10',
    iconColor: 'text-rose-600',
    title: 'Job Description Matching',
    description: 'Paste a job description and see exactly how your CV aligns. Identify missing skills and keyword gaps instantly.'
  },
  {
    icon: Download,
    iconBg: 'bg-sky-100 dark:bg-sky-500/10',
    iconColor: 'text-sky-600',
    title: 'PDF & DOCX Export',
    description: 'Export your finished CV as a pixel-perfect PDF or editable DOCX document, ready to submit to any employer.'
  },
  {
    icon: Sparkles,
    iconBg: 'bg-violet-100 dark:bg-violet-500/10',
    iconColor: 'text-violet-600',
    title: 'AI Writing Assistance',
    description: 'Get AI-powered suggestions for summaries, experience bullets, and achievement descriptions that impress recruiters.'
  },
  {
    icon: Smartphone,
    iconBg: 'bg-teal-100 dark:bg-teal-500/10',
    iconColor: 'text-teal-600',
    title: 'Mobile Ready',
    description: 'Build and manage your CVs on any device. CVForge adapts seamlessly to desktop, tablet, and mobile screens.'
  },
  {
    icon: Crown,
    iconBg: 'bg-amber-100 dark:bg-amber-500/10',
    iconColor: 'text-amber-600',
    title: 'Premium Templates & Tools',
    description: 'Unlock executive templates, unlimited AI optimizations, DOCX export, and advanced career tools with Premium.'
  }
]
</script>
