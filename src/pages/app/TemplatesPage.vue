<template>
  <AppLayout>
    <div class="space-y-8">

      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
            CV Templates
          </h1>
          <p class="text-sm text-neutral-500 mt-1">Choose a professional template to get started</p>
        </div>

        <!-- Search -->
        <div class="relative w-full md:w-72">
          <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            v-model="templateStore.searchQuery"
            type="text"
            placeholder="Search templates..."
            class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all"
          />
        </div>
      </div>

      <!-- Category Filters -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          v-for="cat in templateStore.categories"
          :key="cat"
          @click="templateStore.setCategory(cat)"
          class="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all active:scale-95"
          :class="templateStore.selectedCategory === cat 
            ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20' 
            : 'bg-white dark:bg-dark-card text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-dark-border hover:border-brand-orange/40'"
        >
          {{ cat === 'all' ? 'All Templates' : cat.charAt(0).toUpperCase() + cat.slice(1) }}
        </button>
      </div>

      <!-- Templates Grid -->
      <TransitionGroup 
        name="template-grid" 
        tag="div" 
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="template in templateStore.filteredTemplates"
          :key="template.id"
          class="group bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border overflow-hidden hover:shadow-xl hover:shadow-neutral-200/60 dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Template Preview Card -->
          <div class="relative h-48 overflow-hidden">
            <div :class="['absolute inset-0 bg-gradient-to-br', template.previewColor]"></div>
            
            <!-- Mock CV Lines -->
            <div class="absolute inset-4 flex flex-col gap-2 opacity-40">
              <div class="w-3/4 h-3 bg-white/30 rounded-full"></div>
              <div class="w-1/2 h-2 bg-white/20 rounded-full"></div>
              <div class="w-full h-px bg-white/20 mt-2 mb-1"></div>
              <div class="w-full h-2 bg-white/15 rounded-full"></div>
              <div class="w-5/6 h-2 bg-white/15 rounded-full"></div>
              <div class="w-4/6 h-2 bg-white/15 rounded-full"></div>
              <div class="w-full h-px bg-white/20 mt-2 mb-1"></div>
              <div class="w-full h-2 bg-white/15 rounded-full"></div>
              <div class="w-3/4 h-2 bg-white/15 rounded-full"></div>
            </div>

            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <button 
                @click="selectTemplate(template.id)"
                class="px-5 py-2.5 bg-white text-neutral-900 text-sm font-bold rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 hover:bg-neutral-100 active:scale-95"
              >
                <Sparkles class="w-4 h-4" />
                Use Template
              </button>
            </div>

            <!-- Premium Badge -->
            <div v-if="template.isPremium" class="absolute top-3 right-3">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/90 text-white text-xs font-bold rounded-lg backdrop-blur-sm shadow-md">
                <Crown class="w-3 h-3" />
                Premium
              </span>
            </div>

            <!-- Popularity -->
            <div class="absolute bottom-3 left-3">
              <span class="inline-flex items-center gap-1 px-2 py-1 bg-white/15 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
                <TrendingUp class="w-3 h-3" />
                {{ template.popularity }}% popular
              </span>
            </div>
          </div>

          <!-- Template Info -->
          <div class="p-5">
            <div class="flex items-start justify-between mb-2">
              <h3 class="font-bold text-base text-neutral-900 dark:text-white">{{ template.name }}</h3>
            </div>
            <p class="text-xs text-neutral-500 leading-relaxed mb-4">{{ template.description }}</p>

            <!-- Feature Tags -->
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="feature in template.features"
                :key="feature"
                class="px-2 py-0.5 bg-neutral-100 dark:bg-dark-secondary text-neutral-600 dark:text-neutral-400 text-xs font-medium rounded-md"
              >
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty State -->
      <div 
        v-if="templateStore.filteredTemplates.length === 0" 
        class="text-center py-16 bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border"
      >
        <Search class="w-10 h-10 text-neutral-300 mx-auto mb-3" />
        <h3 class="font-bold text-neutral-800 dark:text-neutral-200">No templates found</h3>
        <p class="text-xs text-neutral-500 mt-1">Try adjusting your search or filter criteria</p>
        <button 
          @click="templateStore.setCategory('all'); templateStore.setSearch('')"
          class="mt-4 px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-lg hover:bg-brand-orange-hover transition"
        >
          Reset Filters
        </button>
      </div>

    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTemplateStore } from '@/stores/templates'
import AppLayout from '@/layouts/AppLayout.vue'
import { Search, Sparkles, Crown, TrendingUp } from '@lucide/vue'

const router = useRouter()
const templateStore = useTemplateStore()

function selectTemplate(templateId: string) {
  router.push(`/editor/new?template=${templateId}`)
}
</script>

<style scoped>
.template-grid-enter-active { transition: all 0.4s ease-out; }
.template-grid-leave-active { transition: all 0.3s ease-in; }
.template-grid-enter-from { opacity: 0; transform: scale(0.95) translateY(10px); }
.template-grid-leave-to { opacity: 0; transform: scale(0.95); }
.template-grid-move { transition: all 0.4s ease; }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
