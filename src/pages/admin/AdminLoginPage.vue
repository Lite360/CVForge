<template>
  <div class="min-h-screen bg-neutral-900 text-white font-ui flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-neutral-800 p-8 rounded-2xl border border-neutral-700 shadow-2xl space-y-6">
      
      <!-- Brand Logo -->
      <div class="text-center space-y-2">
        <div class="w-12 h-12 rounded-xl bg-brand-orange text-white flex items-center justify-center mx-auto shadow-md">
          <ShieldAlert class="w-6 h-6" />
        </div>
        <h1 class="text-2xl font-bold tracking-tight">Admin Access Portal</h1>
        <p class="text-xs text-neutral-400">CVForge Restricted Management System</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleAdminLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-neutral-300 mb-1">Admin Email:</label>
          <input 
            v-model="email" 
            type="email" 
            required 
            placeholder="admin@cvforge.com"
            class="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:ring-1 focus:ring-brand-orange focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-300 mb-1">Password:</label>
          <input 
            v-model="password" 
            type="password" 
            required 
            placeholder="••••••••••••"
            class="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:ring-1 focus:ring-brand-orange focus:outline-none"
          />
        </div>

        <button 
          type="submit" 
          class="w-full py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-md transition transform active:scale-95"
        >
          Sign In to Admin Panel
        </button>
      </form>

      <div class="text-center border-t border-neutral-700 pt-4">
        <p class="text-[11px] text-neutral-500">
          Isolated admin privileges. Unauthorized access attempts are logged.
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ShieldAlert } from 'lucide-vue-next'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleAdminLogin = () => {
  router.push('/access/dashboard')
}
</script>
