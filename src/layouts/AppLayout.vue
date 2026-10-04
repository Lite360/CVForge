<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-dark-bg text-neutral-900 dark:text-neutral-100 font-ui flex flex-col pb-20 md:pb-0">
    <!-- Desktop Header -->
    <header class="bg-white dark:bg-dark-card border-b border-neutral-200 dark:border-dark-border sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <router-link to="/dashboard" class="flex items-center gap-2.5 font-bold text-lg">
          <div class="w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center">
            <FileText class="w-4 h-4" />
          </div>
          <span>CVForge App</span>
        </router-link>

        <!-- Desktop Nav Links -->
        <nav class="hidden md:flex items-center gap-1">
          <router-link 
            v-for="link in desktopLinks" 
            :key="link.to" 
            :to="link.to"
            class="px-3.5 py-2 text-sm font-medium rounded-lg transition-all"
            active-class="bg-orange-50 dark:bg-brand-orange/10 text-brand-orange font-semibold"
          >
            {{ link.label }}
          </router-link>
        </nav>

        <!-- User Menu -->
        <div class="flex items-center gap-4">
          <button class="p-2 text-neutral-500 hover:text-neutral-800 dark:hover:text-white rounded-lg transition">
            <Bell class="w-5 h-5" />
          </button>
          <router-link to="/profile" class="flex items-center gap-3 border-l border-neutral-200 dark:border-dark-border pl-4 hover:opacity-80 transition">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-amber-500 text-white font-bold text-xs flex items-center justify-center">
              {{ authStore.initials || 'U' }}
            </div>
            <span class="text-sm font-semibold hidden sm:inline">{{ authStore.user?.fullName || 'User' }}</span>
          </router-link>
        </div>
      </div>
    </header>

    <!-- App Content Area -->
    <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <!-- PRD Rule #9: Mobile Bottom Navigation (Exactly 4 Primary Destinations) -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-card border-t border-neutral-200 dark:border-dark-border z-40 px-6 py-2">
      <div class="flex items-center justify-around">
        
        <!-- 1. Home -->
        <router-link 
          to="/dashboard" 
          class="flex flex-col items-center gap-1 transition-all duration-200"
          :class="isActiveRoute('/dashboard') ? '' : ''"
        >
          <div :class="[isActiveRoute('/dashboard') ? 'bg-brand-orange text-white' : 'text-neutral-500']" class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90">
            <Home class="w-5 h-5" />
          </div>
          <span :class="[isActiveRoute('/dashboard') ? 'text-brand-orange font-bold' : 'text-neutral-500 font-medium']" class="text-xs">Home</span>
        </router-link>

        <!-- 2. My CVs -->
        <router-link 
          to="/dashboard#my-cvs" 
          class="flex flex-col items-center gap-1 transition-all duration-200"
        >
          <div class="text-neutral-500 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90">
            <FileText class="w-5 h-5" />
          </div>
          <span class="text-neutral-500 font-medium text-xs">My CVs</span>
        </router-link>

        <!-- 3. Templates -->
        <router-link 
          to="/templates" 
          class="flex flex-col items-center gap-1 transition-all duration-200"
        >
          <div :class="[isActiveRoute('/templates') ? 'bg-brand-orange text-white' : 'text-neutral-500']" class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90">
            <LayoutTemplate class="w-5 h-5" />
          </div>
          <span :class="[isActiveRoute('/templates') ? 'text-brand-orange font-bold' : 'text-neutral-500 font-medium']" class="text-xs">Templates</span>
        </router-link>

        <!-- 4. Profile -->
        <router-link 
          to="/profile" 
          class="flex flex-col items-center gap-1 transition-all duration-200"
        >
          <div :class="[isActiveRoute('/profile') ? 'bg-brand-orange text-white' : 'text-neutral-500']" class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90">
            <User class="w-5 h-5" />
          </div>
          <span :class="[isActiveRoute('/profile') ? 'text-brand-orange font-bold' : 'text-neutral-500 font-medium']" class="text-xs">Profile</span>
        </router-link>

      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { FileText, Bell, Home, LayoutTemplate, User } from '@lucide/vue'

const route = useRoute()
const authStore = useAuthStore()

const desktopLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/templates', label: 'Templates' },
  { to: '/optimizer', label: 'AI Optimizer' },
]

function isActiveRoute(path: string): boolean {
  return route.path === path
}
</script>
