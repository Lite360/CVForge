<template>
  <section class="py-16 bg-gradient-to-r from-brand-orange to-amber-500 dark:from-brand-orange/90 dark:to-amber-600">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div class="text-center md:text-left">
          <h3 class="text-xl sm:text-2xl font-extrabold text-white">
            Get CV Tips & Updates
          </h3>
          <p class="text-white/80 text-sm mt-1">
            Subscribe for career advice, CV best practices, and product updates.
          </p>
        </div>

        <form @submit.prevent="handleSubscribe" class="flex w-full md:w-auto gap-3">
          <div class="relative flex-grow md:flex-grow-0">
            <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              v-model="email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full md:w-64 pl-10 pr-4 py-3 bg-white/95 dark:bg-dark-card text-neutral-900 dark:text-white text-sm rounded-xl border-2 border-transparent focus:border-white focus:outline-none placeholder:text-neutral-400 shadow-lg"
            />
          </div>
          <button 
            type="submit"
            :disabled="isSubmitting"
            class="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold rounded-xl shadow-lg whitespace-nowrap transition-all active:scale-95 disabled:opacity-60 flex items-center gap-2"
          >
            <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
            <Send v-else class="w-4 h-4" />
            <span class="hidden sm:inline">Subscribe</span>
          </button>
        </form>
      </div>

      <!-- Success Message -->
      <Transition name="slide-up">
        <div v-if="subscribed" class="mt-4 text-center md:text-right">
          <span class="inline-flex items-center gap-1.5 text-sm text-white font-semibold">
            <CheckCircle2 class="w-4 h-4" />
            You're subscribed! Check your inbox for a welcome email.
          </span>
        </div>
      </Transition>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Mail, Send, CheckCircle2, Loader2 } from '@lucide/vue'

const email = ref('')
const isSubmitting = ref(false)
const subscribed = ref(false)

async function handleSubscribe() {
  isSubmitting.value = true
  
  // Simulate API call — replace with real newsletter API integration
  await new Promise(resolve => setTimeout(resolve, 1200))
  
  isSubmitting.value = false
  subscribed.value = true
  email.value = ''
  
  setTimeout(() => { subscribed.value = false }, 5000)
}
</script>

<style scoped>
.slide-up-enter-active { transition: all 0.3s ease-out; }
.slide-up-leave-active { transition: all 0.2s ease-in; }
.slide-up-enter-from { transform: translateY(8px); opacity: 0; }
.slide-up-leave-to { opacity: 0; }
</style>
