export interface CVBasics {
  name: string
  label: string
  email: string
  phone: string
  location: string
  url: string
  summary: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  highlights: string[]
}

export interface Education {
  id: string
  institution: string
  area: string
  studyType: string
  startDate: string
  endDate: string
}

export interface Skill {
  id: string
  name: string
  level: string
}

export interface CVData {
  id?: string
  title: string
  templateId: string
  basics: CVBasics
  work: WorkExperience[]
  education: Education[]
  skills: Skill[]
}

export const defaultCVData: CVData = {
  title: 'My Professional CV',
  templateId: 'professional-ats',
  basics: {
    name: 'Alex Johnson',
    label: 'Senior Software Engineer',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    url: 'https://linkedin.com/in/alexjohnson',
    summary: 'Experienced Software Engineer with over 6 years of expertise in building scalable web applications, microservices architecture, and technical leadership.'
  },
  work: [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Senior Full Stack Engineer',
      startDate: '2022-01',
      endDate: '',
      current: true,
      highlights: [
        'Architected modern web platform serving 500k active users.',
        'Led team of 5 developers and reduced API latency by 40%.'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'State University',
      area: 'Computer Science',
      studyType: 'Bachelor of Science',
      startDate: '2016-09',
      endDate: '2020-05'
    }
  ],
  skills: [
    { id: '1', name: 'TypeScript', level: 'Advanced' },
    { id: '2', name: 'Vue.js / React', level: 'Advanced' },
    { id: '3', name: 'Node.js & PostgreSQL', level: 'Intermediate' }
  ]
}
