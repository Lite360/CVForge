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
  title: 'Sales Representative CV',
  templateId: 'executive-modern',
  basics: {
    name: 'Fanny Cooper',
    label: 'Sales Representative',
    email: 'fannycooper@email.com',
    phone: '+1 123 456 7890',
    location: 'Chicago, IL',
    url: 'linkedin.com/in/fannycooper',
    summary: "With a background in marketing and sales, and a Master's degree in Business Development, I bring a strong combination of field experience and client relationship management. Through key roles in direct sales, I have developed the ability to prospect, understand customer needs, negotiate effectively, and build long-term client loyalty. Autonomous, detail-oriented, and results-driven, I am eager to contribute to your company's commercial growth through a personalized and performance-focused approach."
  },
  work: [
    {
      id: '1',
      company: 'MaxStyle Boutique, Chicago',
      position: 'Sales Assistant',
      startDate: '2019',
      endDate: '2021',
      current: false,
      highlights: [
        'Implemented a personalized client follow-up system which generated a 20% increase in the revisit rate in 6 months.',
        'Responsible for integrating two new recruits; trained them in sales techniques and product pitches, accelerating their autonomy and rapid growth in skills.'
      ]
    },
    {
      id: '2',
      company: 'Le Patio, Chicago',
      position: 'Bar/Bartender',
      startDate: '2015',
      endDate: '2018',
      current: false,
      highlights: [
        'Analyzed customer preferences by age group to customize beverage recommendations accordingly, resulting in a 25% increase in sales.',
        'Built strong relationships with regular customers through authentic, personalized interactions, driving long-term loyalty and repeat business.',
        'Maintained fast, high-quality service during peak hours by effectively managing pressure and prioritizing tasks to ensure customer satisfaction.'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Lycée Gustave Eiffel, Chicago',
      area: 'Negotiation and Digitalization of Customer Relations',
      studyType: 'Bachelor',
      startDate: '2013',
      endDate: '2015'
    }
  ],
  skills: [
    { id: '1', name: 'Google Analytics', level: 'Advanced' },
    { id: '2', name: 'Google Ads', level: 'Advanced' },
    { id: '3', name: 'Meta Ads Manager', level: 'Advanced' },
    { id: '4', name: 'HubSpot CRM', level: 'Advanced' }
  ]
}
