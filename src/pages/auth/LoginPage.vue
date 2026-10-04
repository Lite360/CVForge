<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-dark-bg flex items-center justify-center p-4 font-ui relative overflow-hidden">
    
    <!-- Animated Background Orbs -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 -left-40 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl"></div>
    </div>

    <div class="w-full max-w-md relative z-10">
      
      <!-- Logo -->
      <router-link to="/" class="flex items-center justify-center gap-3 mb-10 group">
        <div class="w-11 h-11 rounded-xl bg-brand-orange text-white flex items-center justify-center shadow-lg shadow-brand-orange/20 group-hover:scale-110 transition-transform">
          <FileText class="w-5 h-5" />
        </div>
        <span class="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">CVForge</span>
      </router-link>

      <!-- Auth Card -->
      <div class="bg-white dark:bg-dark-card rounded-3xl border border-neutral-200 dark:border-dark-border shadow-xl shadow-neutral-200/50 dark:shadow-black/30 p-8 sm:p-10">
        
        <div class="text-center mb-8">
          <h1 class="text-2xl font-extrabold text-neutral-900 dark:text-white">Welcome back</h1>
          <p class="text-sm text-neutral-500 mt-1.5">Sign in to continue building amazing CVs</p>
        </div>

        <!-- Social Login Buttons -->
        <div class="grid grid-cols-2 gap-3 mb-6">
          <button 
            type="button"
            class="flex items-center justify-center gap-2.5 px-4 py-3 bg-neutral-100 dark:bg-dark-secondary rounded-xl text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-dark-border transition-all active:scale-[0.97]"
          >
            <svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button 
            type="button"
            class="flex items-center justify-center gap-2.5 px-4 py-3 bg-neutral-100 dark:bg-dark-secondary rounded-xl text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-dark-border transition-all active:scale-[0.97]"
          >
            <svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            GitHub
          </button>
        </div>

        <!-- Divider -->
        <div class="flex items-center gap-4 mb-6">
          <div class="flex-1 h-px bg-neutral-200 dark:bg-dark-border"></div>
          <span class="text-xs text-neutral-400 font-medium">or continue with email</span>
          <div class="flex-1 h-px bg-neutral-200 dark:bg-dark-border"></div>
        </div>

        <!-- Error Message -->
        <Transition name="slide-fade">
          <div v-if="authStore.error" class="mb-5 p-3.5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-center gap-3">
            <AlertCircle class="w-4 h-4 text-red-500 flex-shrink-0" />
            <p class="text-sm text-red-600 dark:text-red-400 font-medium">{{ authStore.error }}</p>
          </div>
        </Transition>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label for="login-email" class="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-2 uppercase tracking-wider">Email Address</label>
            <div class="relative">
              <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
              <input
                id="login-email"
                v-model="email"
                type="email"
                placeholder="you@example.com"
                required
                autocomplete="email"
                class="w-full pl-12 pr-4 py-3.5 bg-neutral-50 dark:bg-dark-secondary border border-neutral-200 dark:border-dark-border rounded-xl text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="login-password" class="block text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Password</label>
              <button type="button" class="text-xs text-brand-orange hover:text-brand-orange-hover font-semibold transition">Forgot?</button>
            </div>
            <div class="relative">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
              <input
                id="login-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                required
                autocomplete="current-password"
                class="w-full pl-12 pr-12 py-3.5 bg-neutral-50 dark:bg-dark-secondary border border-neutral-200 dark:border-dark-border rounded-xl text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword" 
                class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition"
              >
                <EyeOff v-if="showPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="authStore.isLoading"
            class="w-full py-3.5 bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Loader2 v-if="authStore.isLoading" class="w-4 h-4 animate-spin" />
            <span>{{ authStore.isLoading ? 'Signing in...' : 'Sign In' }}</span>
          </button>
        </form>

        <!-- Register Link -->
        <p class="text-center text-sm text-neutral-500 mt-6">
          Don't have an account?
          <router-link to="/register" class="text-brand-orange hover:text-brand-orange-hover font-bold transition">Create one free</router-link>
        </p>
      </div>

      <!-- Footer -->
      <p class="text-center text-xs text-neutral-400 mt-8">
        By signing in, you agree to our 
        <a href="#" class="underline hover:text-neutral-600 transition">Terms</a> & 
        <a href="#" class="underline hover:text-neutral-600 transition">Privacy Policy</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { FileText, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

async function handleLogin() {
  const success = await authStore.login(email.value, password.value)
  if (success) {
    router.push('/dashboard')
  }
}
</script>

<style scoped>
.slide-fade-enter-active { transition: all 0.3s ease-out; }
.slide-fade-leave-active { transition: all 0.2s ease-in; }
.slide-fade-enter-from { transform: translateY(-8px); opacity: 0; }
.slide-fade-leave-to { opacity: 0; }
</style>
