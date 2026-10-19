import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CVTemplate {
  id: string
  name: string
  description: string
  tag: string
  previewImage: string
  features: string[]
  isPremium: boolean
}

const templateCatalog: CVTemplate[] = [
  {
    id: 'executive-modern',
    name: 'Executive Modern',
    description: 'Two-column layout with professional summary, experience on the left and skills, languages on the right. Ideal for senior roles.',
    tag: 'Two-Column',
    previewImage: '/templates/executive-modern.jpg',
    features: ['Two-Column Layout', 'Soft & Technical Skills', 'Languages'],
    isPremium: false
  },
  {
    id: 'compact-ats',
    name: 'Compact ATS',
    description: 'Dense single-page format optimized for ATS systems. Pipe-separated skills, NYSC section, and compact spacing to fit everything.',
    tag: 'Single Page',
    previewImage: '/templates/compact-ats.jpg',
    features: ['ATS Optimized', 'Single Page', 'NYSC Section'],
    isPremium: false
  },
  {
    id: 'classic-detailed',
    name: 'Classic Detailed',
    description: 'Comprehensive format with icon contact bar, categorized skills, additional information, and references. Great for detailed CVs.',
    tag: 'Detailed',
    previewImage: '/templates/classic-detailed.jpg',
    features: ['Icon Contact Bar', 'Categorized Skills', 'References'],
    isPremium: false
  }
]

export const useTemplateStore = defineStore('templates', () => {
  const templates = ref<CVTemplate[]>(templateCatalog)

  const filteredTemplates = computed(() => {
    return templates.value
  })

  return {
    templates,
    filteredTemplates
  }
})
