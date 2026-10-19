export interface AtsAnalysisResult {
  overall_score: number
  keyword_match_pct: number
  structure_score: number
  skills_score: number
  formatting_score: number
  recommendations: Array<{
    type: 'error' | 'warning'
    title: string
    description: string
  }>
}

export interface JobMatchResult {
  score: number
  matching: string[]
  missing: string[]
  suggestions: string[]
}

export async function analyzeAts(cvContent: any): Promise<AtsAnalysisResult> {
  const response = await fetch('/api/ats', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'analyze', cvContent })
  })

  const json = await response.json()
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Failed to perform ATS analysis')
  }

  const d = json.data
  return {
    overall_score: d.overall_score || 80,
    keyword_match_pct: d.keyword_match_pct || 80,
    structure_score: d.structure_score || 85,
    skills_score: d.skills_score || 75,
    formatting_score: d.formatting_score || 90,
    recommendations: (d.recommendations || []).map((rec: string, idx: number) => ({
      type: idx === 0 ? 'error' : 'warning',
      title: idx === 0 ? 'Formatting & Keywords' : 'Improvement Suggestion',
      description: rec
    }))
  }
}

export async function matchJobDescription(cvContent: any, jobDescription: string): Promise<JobMatchResult> {
  const response = await fetch('/api/ats', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'match_job', cvContent, jobDescription })
  })

  const json = await response.json()
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Failed to compare job description')
  }

  const d = json.data
  return {
    score: d.match_percentage || 70,
    matching: d.matching_skills || [],
    missing: d.missing_skills || [],
    suggestions: d.recommendations || []
  }
}
