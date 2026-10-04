import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CVTemplate {
  id: string
  name: string
  description: string
  category: 'professional' | 'creative' | 'academic' | 'minimal'
  previewColor: string
  features: string[]
  isPremium: boolean
  popularity: number
}

const templateCatalog: CVTemplate[] = [
  {
    id: 'professional-ats',
    name: 'Professional ATS',
    description: 'Clean, ATS-optimized layout designed to pass automated screening systems with a high success rate.',
    category: 'professional',
    previewColor: 'from-slate-700 to-slate-900',
    features: ['ATS Optimized', 'Clean Layout', 'Standard Sections'],
    isPremium: false,
    popularity: 95
  },
  {
    id: 'executive-modern',
    name: 'Executive Modern',
    description: 'Sophisticated design for senior professionals and leadership roles with an authoritative presence.',
    category: 'professional',
    previewColor: 'from-neutral-800 to-zinc-900',
    features: ['Executive Summary', 'Leadership Focus', 'Achievement Highlights'],
    isPremium: true,
    popularity: 88
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    description: 'Bold, visually striking template for designers, marketers, and creatives who want to stand out.',
    category: 'creative',
    previewColor: 'from-orange-500 to-rose-600',
    features: ['Portfolio Section', 'Color Accents', 'Visual Skills'],
    isPremium: true,
    popularity: 82
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Elegant minimalist design that lets your content speak for itself. Perfect for any industry.',
    category: 'minimal',
    previewColor: 'from-gray-100 to-gray-300',
    features: ['Whitespace Focused', 'Typography Driven', 'Universal'],
    isPremium: false,
    popularity: 90
  },
  {
    id: 'academic-research',
    name: 'Academic CV',
    description: 'Comprehensive academic curriculum vitae with sections for publications, grants, and research.',
    category: 'academic',
    previewColor: 'from-emerald-700 to-teal-800',
    features: ['Publications', 'Research Projects', 'Teaching Experience'],
    isPremium: true,
    popularity: 75
  },
  {
    id: 'tech-developer',
    name: 'Tech Developer',
    description: 'Developer-focused template featuring skills matrix, open source contributions, and project showcases.',
    category: 'professional',
    previewColor: 'from-indigo-600 to-violet-700',
    features: ['Skills Matrix', 'GitHub Stats', 'Project Cards'],
    isPremium: false,
    popularity: 92
  },
  {
    id: 'designer-portfolio',
    name: 'Designer Portfolio',
    description: 'Visual portfolio-centric CV with image gallery support and design philosophy section.',
    category: 'creative',
    previewColor: 'from-pink-500 to-purple-600',
    features: ['Image Gallery', 'Design Philosophy', 'Client Testimonials'],
    isPremium: true,
    popularity: 79
  },
  {
    id: 'consultant-impact',
    name: 'Consultant Impact',
    description: 'Results-oriented layout that showcases consulting engagements, KPIs, and measurable business impact.',
    category: 'professional',
    previewColor: 'from-amber-600 to-orange-700',
    features: ['Impact Metrics', 'Case Studies', 'Client Logos'],
    isPremium: true,
    popularity: 84
  }
]

export const useTemplateStore = defineStore('templates', () => {
  const templates = ref<CVTemplate[]>(templateCatalog)
  const selectedCategory = ref<string>('all')
  const searchQuery = ref('')

  const categories = computed(() => {
    const cats = [...new Set(templates.value.map(t => t.category))]
    return ['all', ...cats]
  })

  const filteredTemplates = computed(() => {
    let result = templates.value

    if (selectedCategory.value !== 'all') {
      result = result.filter(t => t.category === selectedCategory.value)
    }

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(
        t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      )
    }

    return result.sort((a, b) => b.popularity - a.popularity)
  })

  function setCategory(cat: string) {
    selectedCategory.value = cat
  }

  function setSearch(q: string) {
    searchQuery.value = q
  }

  return {
    templates,
    selectedCategory,
    searchQuery,
    categories,
    filteredTemplates,
    setCategory,
    setSearch
  }
})
