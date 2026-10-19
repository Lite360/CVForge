<template>
  <AppLayout>
    <div class="space-y-8">

      <!-- Page Header -->
      <div class="text-center max-w-2xl mx-auto">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
          Choose Your CV Template
        </h1>
        <p class="text-sm text-neutral-500 mt-2">Pick a professional format that best suits your career. Each template is ATS-friendly and fully customizable.</p>
      </div>

      <!-- Templates Grid (3 cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div
          v-for="template in templateStore.filteredTemplates"
          :key="template.id"
          class="group bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border overflow-hidden hover:shadow-xl hover:shadow-neutral-200/60 dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Template Preview Image -->
          <div class="relative overflow-hidden bg-neutral-100 dark:bg-dark-secondary">
            <img 
              :src="template.previewImage" 
              :alt="template.name + ' template preview'"
              class="w-full h-auto object-cover object-top aspect-[3/4] transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
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

            <!-- Tag Badge -->
            <div class="absolute top-3 right-3">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 dark:bg-dark-card/90 text-neutral-700 dark:text-neutral-200 text-xs font-bold rounded-lg backdrop-blur-sm shadow-md">
                {{ template.tag }}
              </span>
            </div>
          </div>

          <!-- Template Info -->
          <div class="p-5">
            <h3 class="font-bold text-base text-neutral-900 dark:text-white mb-1">{{ template.name }}</h3>
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

            <!-- Use Button (mobile-friendly) -->
            <button 
              @click="selectTemplate(template.id)"
              class="mt-4 w-full py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 lg:hidden"
            >
              <Sparkles class="w-4 h-4" />
              Use This Template
            </button>
          </div>
        </div>
      </div>

    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTemplateStore } from '@/stores/templates'
import AppLayout from '@/layouts/AppLayout.vue'
import { Sparkles } from '@lucide/vue'

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
</style>
