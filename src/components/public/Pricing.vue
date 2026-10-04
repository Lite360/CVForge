<template>
  <div id="pricing" class="py-20 bg-neutral-50 dark:bg-dark-secondary/50 border-b border-neutral-100 dark:border-dark-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">Transparent Pricing</h2>
        <p class="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">Choose Your Plan</p>
        <p class="mt-3 text-neutral-600 dark:text-neutral-400">Simple pricing for job seekers at every stage of their career.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
        
        <!-- Free Plan -->
        <div class="bg-white dark:bg-dark-card p-8 rounded-2xl border border-neutral-200 dark:border-dark-border flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-bold text-neutral-900 dark:text-white">Free Plan</h3>
            <p class="text-sm text-neutral-500 mt-1">Perfect for creating your first CV.</p>
            <div class="my-6">
              <span class="text-4xl font-extrabold text-neutral-900 dark:text-white">$0</span>
              <span class="text-neutral-500 text-sm"> / forever</span>
            </div>

            <ul class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              <li class="flex items-center gap-2.5">
                <Check class="w-4 h-4 text-emerald-500" />
                <span>Create & Save 1 CV</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check class="w-4 h-4 text-emerald-500" />
                <span>Basic ATS Templates</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check class="w-4 h-4 text-emerald-500" />
                <span>Basic PDF Export</span>
              </li>
              <li class="flex items-center gap-2.5 text-neutral-400">
                <X class="w-4 h-4 text-neutral-400" />
                <span>AI CV Optimizer</span>
              </li>
            </ul>
          </div>

          <div class="pt-8">
            <router-link to="/dashboard" class="w-full block text-center py-3 px-4 border border-neutral-300 dark:border-dark-border rounded-xl text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-dark-secondary transition-colors">
              Get Started Free
            </router-link>
          </div>
        </div>

        <!-- Premium Monthly -->
        <div class="bg-white dark:bg-dark-card p-8 rounded-2xl border-2 border-brand-orange relative flex flex-col justify-between shadow-xl">
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Most Popular
          </div>

          <div>
            <h3 class="text-xl font-bold text-neutral-900 dark:text-white">Premium Monthly</h3>
            <p class="text-sm text-neutral-500 mt-1">Full access to AI & templates.</p>
            <div class="my-6">
              <span class="text-4xl font-extrabold text-neutral-900 dark:text-white">$12</span>
              <span class="text-neutral-500 text-sm"> / month</span>
            </div>

            <ul class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              <li class="flex items-center gap-2.5">
                <Check class="w-4 h-4 text-brand-orange" />
                <span>Unlimited CVs</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check class="w-4 h-4 text-brand-orange" />
                <span>All Premium Templates</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check class="w-4 h-4 text-brand-orange" />
                <span>AI CV Optimizer (50 requests/mo)</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check class="w-4 h-4 text-brand-orange" />
                <span>ATS Compatibility Score</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check class="w-4 h-4 text-brand-orange" />
                <span>PDF & DOCX Export</span>
              </li>
            </ul>
          </div>

          <div class="pt-8">
            <router-link to="/dashboard" class="w-full block text-center py-3 px-4 bg-brand-orange hover:bg-brand-orange-hover rounded-xl text-sm font-semibold text-white shadow-md transition-colors">
              Upgrade to Premium
            </router-link>
          </div>
        </div>

        <!-- Premium Yearly -->
        <div class="bg-white dark:bg-dark-card p-8 rounded-2xl border border-neutral-200 dark:border-dark-border flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-bold text-neutral-900 dark:text-white">Premium Yearly</h3>
            <p class="text-sm text-neutral-500 mt-1">Save 40% with annual billing.</p>
            <div class="my-6">
              <span class="text-4xl font-extrabold text-neutral-900 dark:text-white">$85</span>
              <span class="text-neutral-500 text-sm"> / year</span>
            </div>

            <ul class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              <li class="flex items-center gap-2.5">
                <Check class="w-4 h-4 text-emerald-500" />
                <span>Everything in Monthly</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check class="w-4 h-4 text-emerald-500" />
                <span>Higher AI Usage Limit</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check class="w-4 h-4 text-emerald-500" />
                <span>Job Description Matcher</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check class="w-4 h-4 text-emerald-500" />
                <span>Priority Support</span>
              </li>
            </ul>
          </div>

          <div class="pt-8">
            <router-link to="/dashboard" class="w-full block text-center py-3 px-4 border border-neutral-300 dark:border-dark-border rounded-xl text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-dark-secondary transition-colors">
              Get Yearly Plan
            </router-link>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, X } from '@lucide/vue'
</script>
