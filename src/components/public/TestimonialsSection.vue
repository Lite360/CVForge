<template>
  <section id="testimonials" class="py-24 bg-white dark:bg-dark-bg border-b border-neutral-100 dark:border-dark-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="text-xs font-bold text-brand-orange uppercase tracking-wider">Testimonials</span>
        <h2 class="mt-2 text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">
          Loved by Job Seekers
        </h2>
        <p class="mt-4 text-neutral-600 dark:text-neutral-400">
          See how CVForge is helping professionals land interviews and advance their careers.
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="bg-neutral-50 dark:bg-dark-card p-6 rounded-2xl border border-neutral-200 dark:border-dark-border flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
        >
          <!-- Stars -->
          <div>
            <div class="flex items-center gap-0.5 mb-4">
              <Star v-for="n in 5" :key="n" class="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            
            <p class="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
              "{{ testimonial.quote }}"
            </p>
          </div>

          <!-- Author -->
          <div class="flex items-center gap-3 pt-6 mt-6 border-t border-neutral-200 dark:border-dark-border">
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
              :class="testimonial.avatarBg"
            >
              {{ testimonial.initials }}
            </div>
            <div>
              <p class="font-bold text-sm text-neutral-900 dark:text-white">{{ testimonial.name }}</p>
              <p class="text-xs text-neutral-500">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { Star } from '@lucide/vue'

const testimonials = [
  {
    name: 'Chioma Okafor',
    role: 'Software Engineer, Lagos',
    initials: 'CO',
    avatarBg: 'bg-gradient-to-br from-brand-orange to-amber-500',
    quote: 'CVForge helped me restructure my CV and add the right keywords. I got 3 interview callbacks within a week of using the ATS checker. The AI optimizer suggestions were incredibly specific.'
  },
  {
    name: 'Daniel Mensah',
    role: 'Product Manager, Accra',
    initials: 'DM',
    avatarBg: 'bg-gradient-to-br from-indigo-500 to-violet-600',
    quote: 'I was amazed by how precise the job matching feature is. It showed me exactly which skills were missing from my CV for a PM role I wanted. After making the changes, I got the interview.'
  },
  {
    name: 'Amina Bello',
    role: 'Recent Graduate, Abuja',
    initials: 'AB',
    avatarBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    quote: 'As a fresh graduate, I had no idea how to write a professional CV. CVForge\'s templates and step-by-step editor made it so simple. I now have a CV I\'m genuinely proud of.'
  }
]
</script>
