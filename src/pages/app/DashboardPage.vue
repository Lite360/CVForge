<template>
  <AppLayout>
    <div class="space-y-8">
      
      <!-- Welcome Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-dark-card p-6 rounded-2xl border border-neutral-200 dark:border-dark-border shadow-sm">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
            Welcome back, {{ userName }}
          </h1>
          <p class="text-neutral-500 text-sm mt-1">Ready to improve your CV?</p>
        </div>
        <div class="flex gap-3">
          <router-link to="/editor/new" class="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold rounded-xl shadow-sm transition flex items-center gap-2">
            <Plus class="w-4 h-4" />
            <span>Create New CV</span>
          </router-link>
        </div>
      </div>

      <!-- Quick Action Cards Grid (PRD #10) -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <router-link to="/editor/new" class="p-5 bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border hover:border-brand-orange transition-all group">
          <div class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Plus class="w-5 h-5" />
          </div>
          <h3 class="font-bold text-sm text-neutral-900 dark:text-white">Create New CV</h3>
          <p class="text-xs text-neutral-500 mt-0.5">Start from scratch</p>
        </router-link>

        <router-link to="/optimizer" class="p-5 bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border hover:border-amber-500 transition-all group">
          <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Wand2 class="w-5 h-5" />
          </div>
          <h3 class="font-bold text-sm text-neutral-900 dark:text-white">Optimize CV</h3>
          <p class="text-xs text-neutral-500 mt-0.5">Upload & AI Improve</p>
        </router-link>

        <router-link to="/ats" class="p-5 bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border hover:border-emerald-500 transition-all group">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <CheckCircle2 class="w-5 h-5" />
          </div>
          <h3 class="font-bold text-sm text-neutral-900 dark:text-white">Check ATS Score</h3>
          <p class="text-xs text-neutral-500 mt-0.5">Analyze parsing</p>
        </router-link>

        <router-link to="/job-match" class="p-5 bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border hover:border-indigo-500 transition-all group">
          <div class="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Target class="w-5 h-5" />
          </div>
          <h3 class="font-bold text-sm text-neutral-900 dark:text-white">Match to Job</h3>
          <p class="text-xs text-neutral-500 mt-0.5">Tailor for job post</p>
        </router-link>
      </div>

      <!-- Recent CVs Section -->
      <div id="my-cvs" class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-neutral-900 dark:text-white">Recent CVs</h2>
          <span class="text-xs text-neutral-500 font-medium">{{ cvList.length }} saved CVs</span>
        </div>

        <div v-if="cvList.length === 0" class="p-12 text-center bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border">
          <FileText class="w-10 h-10 text-neutral-400 mx-auto mb-3" />
          <h3 class="font-bold text-neutral-800 dark:text-neutral-200">No CVs created yet</h3>
          <p class="text-xs text-neutral-500 mt-1 mb-4">Create your first CV or optimize an existing document.</p>
          <router-link to="/editor/new" class="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange text-white text-xs font-semibold rounded-lg">
            <Plus class="w-4 h-4" /> Create CV Now
          </router-link>
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="cv in cvList" 
            :key="cv.id"
            class="bg-white dark:bg-dark-card p-5 rounded-2xl border border-neutral-200 dark:border-dark-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-brand-orange dark:bg-brand-orange/10">
                  {{ cv.template }}
                </span>
                <span class="text-xs text-neutral-400">{{ cv.lastUpdated }}</span>
              </div>
              <h3 class="font-bold text-base text-neutral-900 dark:text-white mb-1">{{ cv.title }}</h3>
              <p class="text-xs text-neutral-500">Status: <span class="capitalize text-emerald-600 font-medium">{{ cv.status }}</span></p>
            </div>

            <!-- Quick Actions: Edit, Preview, Duplicate, Delete -->
            <div class="pt-6 border-t border-neutral-100 dark:border-dark-border mt-4 flex items-center justify-between">
              <router-link :to="`/editor/${cv.id}`" class="text-xs font-bold text-brand-orange hover:text-brand-orange-hover">
                Edit CV
              </router-link>
              <div class="flex items-center gap-2 text-neutral-400">
                <button title="Duplicate" class="p-1 hover:text-neutral-700 dark:hover:text-white"><Copy class="w-4 h-4" /></button>
                <button title="Export PDF" class="p-1 hover:text-neutral-700 dark:hover:text-white"><Download class="w-4 h-4" /></button>
                <button title="Delete" class="p-1 hover:text-red-600"><Trash2 class="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscription Card (PRD #10) -->
      <div class="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div>
          <span class="text-xs uppercase font-bold text-brand-orange tracking-wider">Subscription Plan</span>
          <h3 class="text-xl font-extrabold mt-0.5 capitalize">{{ authStore.user?.plan || 'Free' }} Plan</h3>
          <p class="text-xs text-neutral-400 mt-1">AI Usage: {{ authStore.user?.aiCreditsUsed || 0 }} / {{ authStore.user?.aiCreditsTotal || 10 }} monthly credits used</p>
        </div>
        <router-link to="/#pricing" class="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl whitespace-nowrap transition">
          Upgrade to Premium
        </router-link>
      </div>

    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { Plus, Wand2, CheckCircle2, Target, FileText, Copy, Download, Trash2 } from '@lucide/vue'

const authStore = useAuthStore()
const userName = computed(() => authStore.user?.fullName || 'User')

const cvList = ref([
  {
    id: '1',
    title: 'Senior Software Engineer CV',
    template: 'Professional ATS',
    status: 'saved',
    lastUpdated: '2 hours ago'
  },
  {
    id: '2',
    title: 'Product Manager Resume 2026',
    template: 'Executive',
    status: 'draft',
    lastUpdated: 'Yesterday'
  }
])
</script>
