/**
 * CVForge — CV Management Store
 * 
 * Manages active CV data, recent CVs list, duplication, deletion, and local persistence.
 * PRD §10, §30
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface PersonalInfo {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  summary: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface SkillItem {
  id: string
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  link?: string
  technologies?: string
}

export interface CVData {
  id: string
  title: string
  templateId: string
  lastUpdated: string
  status: 'draft' | 'saved'
  personalInfo: PersonalInfo
  workExperiences: WorkExperience[]
  education: Education[]
  skills: SkillItem[]
  projects: ProjectItem[]
}

export const useCVStore = defineStore('cv', () => {
  const cvList = ref<CVData[]>([
    {
      id: 'cv-1',
      title: 'Senior Software Engineer CV',
      templateId: 'modern-ats',
      lastUpdated: '2 hours ago',
      status: 'saved',
      personalInfo: {
        fullName: 'Alex Johnson',
        jobTitle: 'Senior Full Stack Developer',
        email: 'alex.j@example.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexj',
        github: 'github.com/alexj',
        summary: 'Experienced Full Stack Developer with 7+ years in Web Technologies.'
      },
      workExperiences: [
        {
          id: 'w-1',
          company: 'TechCorp Solutions',
          position: 'Senior Engineer',
          startDate: '2022-01',
          endDate: '',
          current: true,
          description: 'Led architecture and migration of core API serverless microservices.'
        }
      ],
      education: [
        {
          id: 'e-1',
          institution: 'UC Berkeley',
          degree: 'B.S. Computer Science',
          fieldOfStudy: 'Computer Science',
          startDate: '2015',
          endDate: '2019'
        }
      ],
      skills: [
        { id: 's-1', name: 'TypeScript', level: 'Expert' },
        { id: 's-2', name: 'Vue.js / React', level: 'Expert' },
        { id: 's-3', name: 'Node.js', level: 'Advanced' }
      ],
      projects: []
    }
  ])

  const currentCV = ref<CVData | null>(cvList.value[0])

  function getCVById(id: string): CVData | undefined {
    return cvList.value.find(c => c.id === id)
  }

  function createNewCV(title = 'Untitled CV', templateId = 'modern-ats'): CVData {
    const newCV: CVData = {
      id: `cv-${Date.now()}`,
      title,
      templateId,
      lastUpdated: 'Just now',
      status: 'draft',
      personalInfo: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        summary: ''
      },
      workExperiences: [],
      education: [],
      skills: [],
      projects: []
    }
    cvList.value.unshift(newCV)
    currentCV.value = newCV
    saveToStorage()
    return newCV
  }

  function duplicateCV(id: string): CVData | null {
    const original = getCVById(id)
    if (!original) return null
    
    const copy: CVData = JSON.parse(JSON.stringify(original))
    copy.id = `cv-${Date.now()}`
    copy.title = `${original.title} (Copy)`
    copy.lastUpdated = 'Just now'
    
    cvList.value.unshift(copy)
    saveToStorage()
    return copy
  }

  function deleteCV(id: string) {
    cvList.value = cvList.value.filter(c => c.id !== id)
    if (currentCV.value?.id === id) {
      currentCV.value = cvList.value[0] || null
    }
    saveToStorage()
  }

  function saveToStorage() {
    localStorage.setItem('cvforge_cvs', JSON.stringify(cvList.value))
  }

  function loadFromStorage() {
    const saved = localStorage.getItem('cvforge_cvs')
    if (saved) {
      try {
        cvList.value = JSON.parse(saved)
        if (cvList.value.length > 0 && !currentCV.value) {
          currentCV.value = cvList.value[0]
        }
      } catch (e) {
        console.error('Failed to load CVs from storage', e)
      }
    }
  }

  return {
    cvList,
    currentCV,
    getCVById,
    createNewCV,
    duplicateCV,
    deleteCV,
    loadFromStorage
  }
})
