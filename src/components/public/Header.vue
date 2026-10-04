<template>
  <header class="sticky top-0 z-50 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-neutral-200 dark:border-dark-border transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2.5 font-bold text-xl tracking-tight">
        <div class="w-9 h-9 rounded-lg bg-brand-orange text-white flex items-center justify-center shadow-sm">
          <FileText class="w-5 h-5" />
        </div>
        <span class="text-neutral-900 dark:text-white font-ui">CVForge</span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
        <a href="#features" class="hover:text-brand-orange dark:hover:text-brand-orange-dark transition-colors">Features</a>
        <a href="#templates" class="hover:text-brand-orange dark:hover:text-brand-orange-dark transition-colors">Templates</a>
        <a href="#optimizer" class="hover:text-brand-orange dark:hover:text-brand-orange-dark transition-colors">AI Optimizer</a>
        <a href="#ats" class="hover:text-brand-orange dark:hover:text-brand-orange-dark transition-colors">ATS Checker</a>
        <a href="#pricing" class="hover:text-brand-orange dark:hover:text-brand-orange-dark transition-colors">Pricing</a>
        <a href="#faq" class="hover:text-brand-orange dark:hover:text-brand-orange-dark transition-colors">FAQ</a>
      </nav>

      <!-- Auth Actions -->
      <div class="hidden md:flex items-center gap-4">
        <router-link to="/dashboard" class="text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-colors">
          Sign In
        </router-link>
        <router-link to="/dashboard" class="px-4 py-2 text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orange-hover rounded-lg shadow-sm transition-all transform active:scale-95">
          Create My CV
        </router-link>
      </div>

      <!-- Mobile Menu Toggle -->
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 focus:outline-none">
        <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div v-if="mobileMenuOpen" class="md:hidden border-b border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-bg px-4 pt-2 pb-6 space-y-3">
      <a @click="mobileMenuOpen = false" href="#features" class="block py-2 text-neutral-600 dark:text-neutral-300 font-medium">Features</a>
      <a @click="mobileMenuOpen = false" href="#templates" class="block py-2 text-neutral-600 dark:text-neutral-300 font-medium">Templates</a>
      <a @click="mobileMenuOpen = false" href="#optimizer" class="block py-2 text-neutral-600 dark:text-neutral-300 font-medium">AI Optimizer</a>
      <a @click="mobileMenuOpen = false" href="#ats" class="block py-2 text-neutral-600 dark:text-neutral-300 font-medium">ATS Checker</a>
      <a @click="mobileMenuOpen = false" href="#pricing" class="block py-2 text-neutral-600 dark:text-neutral-300 font-medium">Pricing</a>
      <a @click="mobileMenuOpen = false" href="#faq" class="block py-2 text-neutral-600 dark:text-neutral-300 font-medium">FAQ</a>
      <div class="pt-4 border-t border-neutral-200 dark:border-dark-border flex flex-col gap-3">
        <router-link to="/dashboard" class="w-full text-center py-2.5 text-sm font-semibold text-neutral-700 dark:text-neutral-200 border border-neutral-300 dark:border-dark-border rounded-lg">
          Sign In
        </router-link>
        <router-link to="/dashboard" class="w-full text-center py-2.5 text-sm font-semibold text-white bg-brand-orange rounded-lg">
          Create My CV
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FileText, Menu, X } from 'lucide-vue-next'

const mobileMenuOpen = ref(false)
</script>
