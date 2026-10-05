<template>
  <section id="faq" class="py-24 bg-neutral-50 dark:bg-dark-secondary/50 border-b border-neutral-100 dark:border-dark-border">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-xs font-bold text-brand-orange uppercase tracking-wider">FAQ</span>
        <h2 class="mt-2 text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p class="mt-4 text-neutral-600 dark:text-neutral-400">
          Got questions? We have answers. If you need more help, reach out to our support team.
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="space-y-3">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white dark:bg-dark-card rounded-xl border border-neutral-200 dark:border-dark-border overflow-hidden transition-all"
        >
          <button
            @click="toggle(index)"
            class="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-neutral-50 dark:hover:bg-dark-secondary/50 transition-colors"
          >
            <span class="font-semibold text-sm text-neutral-900 dark:text-white pr-4">{{ faq.question }}</span>
            <ChevronDown 
              class="w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-300"
              :class="{ 'rotate-180': openIndex === index }"
            />
          </button>
          
          <Transition name="accordion">
            <div v-if="openIndex === index" class="px-6 pb-5">
              <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ faq.answer }}</p>
            </div>
          </Transition>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from '@lucide/vue'

const openIndex = ref<number | null>(0)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}

const faqs = [
  {
    question: 'Is CVForge free to use?',
    answer: 'Yes! CVForge offers a free plan that lets you create a CV, choose from basic ATS-friendly templates, and export it as a PDF. Premium features like AI optimization, DOCX export, and advanced templates are available with a paid subscription.'
  },
  {
    question: 'How does the AI CV Optimizer work?',
    answer: 'Upload your existing CV (PDF or DOCX) and our Ayo AI analyzes every section. It identifies weak wording, missing keywords, and areas for improvement. You can accept, edit, or reject each suggestion individually — the AI never silently modifies your CV.'
  },
  {
    question: 'What is an ATS and why does it matter?',
    answer: 'An ATS (Applicant Tracking System) is software used by most employers to filter CVs before a human reads them. Over 75% of CVs are rejected by ATS. CVForge checks your CV against common ATS parsing criteria and helps you fix formatting, keyword, and structure issues.'
  },
  {
    question: 'Can I export my CV as a Word document (DOCX)?',
    answer: 'DOCX export is available on the Premium plan. Free users can export their CVs as PDF documents. Both formats are professionally formatted and ready for job applications.'
  },
  {
    question: 'Will the AI invent information about me?',
    answer: 'No. CVForge AI strictly improves existing content — it rewrites weak bullets, suggests stronger verbs, and identifies missing keywords. It will never fabricate employment, degrees, certifications, or achievements. If information is missing, the AI will recommend you provide it.'
  },
  {
    question: 'How do I cancel my Premium subscription?',
    answer: 'You can cancel your subscription at any time from your Profile settings. Your Premium access will continue until the end of your current billing period. We process payments through Paystack and never store your card details.'
  },
  {
    question: 'Can I use CVForge on my phone?',
    answer: 'Absolutely. CVForge is fully responsive and works on desktop, tablet, and mobile devices. You can even install it as a Progressive Web App (PWA) for an app-like experience on your phone.'
  },
  {
    question: 'Who developed CVForge?',
    answer: 'CVForge is developed by Elite Developers, a team focused on building professional, accessible career tools that help job seekers succeed.'
  }
]
</script>

<style scoped>
.accordion-enter-active {
  transition: all 0.3s ease-out;
  max-height: 200px;
}
.accordion-leave-active {
  transition: all 0.2s ease-in;
  max-height: 200px;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
