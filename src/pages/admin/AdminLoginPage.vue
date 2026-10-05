<template>
  <div class="min-h-screen bg-neutral-950 text-white font-ui flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Ambient Glow Effects -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/15 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>

    <div class="w-full max-w-md bg-neutral-900/90 backdrop-blur-xl p-8 rounded-3xl border border-neutral-800 shadow-2xl space-y-6 relative z-10">
      
      <!-- Brand Header -->
      <div class="text-center space-y-3">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-orange to-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-orange/20">
          <ShieldAlert class="w-7 h-7" />
        </div>
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-white">Admin Access Portal</h1>
          <p class="text-xs text-neutral-400 mt-1">CVForge System Control & Management</p>
        </div>
      </div>

      <!-- Error Alert -->
      <div v-if="errorMessage" class="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 font-medium">
        <AlertCircle class="w-4 h-4 flex-shrink-0" />
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleAdminLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-neutral-300 mb-1.5">Admin Email</label>
          <div class="relative">
            <Mail class="w-4 h-4 absolute left-3.5 top-3 text-neutral-500" />
            <input 
              v-model="email" 
              type="email" 
              required 
              placeholder="admin@cvforge.com"
              class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:ring-1 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-300 mb-1.5">Password</label>
          <div class="relative">
            <Lock class="w-4 h-4 absolute left-3.5 top-3 text-neutral-500" />
            <input 
              v-model="password" 
              type="password" 
              required 
              placeholder="••••••••••••"
              class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:ring-1 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition"
            />
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full py-3 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-amber-600 hover:to-brand-orange text-white text-xs font-bold rounded-xl shadow-lg shadow-brand-orange/20 transition transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
          <span>{{ isLoading ? 'Authenticating...' : 'Sign In to Admin Panel' }}</span>
        </button>
      </form>

      <!-- Demo Fill Button -->
      <div class="pt-2 border-t border-neutral-800 text-center space-y-2">
        <button 
          @click="fillDemoCredentials"
          type="button" 
          class="text-xs text-brand-orange hover:text-amber-400 font-semibold transition underline underline-offset-4"
        >
          Use Demo Admin Credentials
        </button>
        <p class="text-[11px] text-neutral-500">
          Demo: admin@cvforge.com / admin123
        </p>
      </div>

      <div class="text-center pt-2">
        <router-link to="/" class="text-xs text-neutral-400 hover:text-white transition">
          ← Back to Main App
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ShieldAlert, Mail, Lock, AlertCircle, Loader2 } from '@lucide/vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const fillDemoCredentials = () => {
  email.value = 'admin@cvforge.com'
  password.value = 'admin123'
  errorMessage.value = ''
}

const handleAdminLogin = () => {
  errorMessage.value = ''
  isLoading.value = true

  setTimeout(() => {
    // Validate credentials
    if (email.value === 'admin@cvforge.com' && password.value === 'admin123') {
      localStorage.setItem('cvforge_admin_token', 'admin_session_' + Date.now())
      localStorage.setItem('cvforge_admin_user', JSON.stringify({
        email: email.value,
        name: 'System Super Admin',
        role: 'SUPER_ADMIN'
      }))
      isLoading.value = false
      router.push('/access/dashboard')
    } else if (email.value && password.value) {
      // Allow any login with admin domain or password for easy testing
      localStorage.setItem('cvforge_admin_token', 'admin_session_' + Date.now())
      localStorage.setItem('cvforge_admin_user', JSON.stringify({
        email: email.value,
        name: 'Admin User',
        role: 'ADMIN'
      }))
      isLoading.value = false
      router.push('/access/dashboard')
    } else {
      isLoading.value = false
      errorMessage.value = 'Invalid admin email or password'
    }
  }, 600)
}
</script>
