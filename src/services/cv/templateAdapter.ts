import type { CVData }
  from '@/types/cv'

export interface CVTemplateAdapter {
  renderHTML(cv: CVData, templateId?: string): string
}

export class DefaultCVTemplateAdapter implements CVTemplateAdapter {
  renderHTML(cv: CVData, templateId: string = 'professional-ats'): string {
    const basics = cv.basics || {}
    const work = cv.work || []
    const education = cv.education || []
    const skills = cv.skills || []
    const isModernTwoCol = templateId.includes('modern') || templateId.includes('executive') || templateId.includes('creative')

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${basics.name || 'Resume'} — CVForge</title>
  <style>
    @page { size: A4; margin: 15mm; }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #111111;
      line-height: 1.45;
      font-size: 10.5pt;
      margin: 0;
      padding: 0;
    }
    .header { text-align: center; border-bottom: 2px solid #111111; padding-bottom: 10px; margin-bottom: 16px; }
    .job-title { font-size: 20pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin: 0; }
    .name { font-size: 13pt; font-weight: bold; text-transform: uppercase; color: #222222; margin-top: 3px; }
    .contact { font-size: 9pt; color: #555555; margin-top: 5px; }
    .section-title { font-size: 10.5pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #cccccc; padding-bottom: 2px; margin-top: 14px; margin-bottom: 6px; letter-spacing: 0.5px; }
    .work-item, .edu-item { margin-bottom: 10px; }
    .flex-between { display: flex; justify-content: space-between; align-items: baseline; font-weight: bold; font-size: 10pt; }
    .dates { font-weight: normal; color: #555555; font-size: 9pt; }
    ul { margin: 3px 0 0 0; padding-left: 16px; }
    li { margin-bottom: 2px; font-size: 9.5pt; }
    .container { display: flex; gap: 20px; }
    .main-col { flex: 7; }
    .side-col { flex: 5; border-left: 1px solid #e0e0e0; padding-left: 16px; }
    .skills-grid { display: flex; flex-wrap: wrap; gap: 4px 8px; font-size: 9pt; }
    .skill-tag { background: #f3f3f3; padding: 2px 6px; border-radius: 3px; }
  </style>
</head>
<body>
  <div class="header">
    <h1 class="job-title">${basics.label || 'SALES REPRESENTATIVE'}</h1>
    <div class="name">${basics.name || 'FANNY COOPER'}</div>
    <div class="contact">
      ${[basics.phone, basics.email, basics.location, basics.url].filter(Boolean).join('  •  ')}
    </div>
  </div>

  ${basics.summary ? `
  <div style="margin-bottom: 14px;">
    <div class="section-title">Professional Summary</div>
    <p style="margin: 0; font-size: 9.5pt; text-align: justify;">${basics.summary}</p>
  </div>
  ` : ''}

  ${isModernTwoCol ? `
  <div class="container">
    <div class="main-col">
      ${work.length > 0 ? `
      <div>
        <div class="section-title">Professional Experience</div>
        ${work.map(w => `
          <div class="work-item">
            <div class="flex-between">
              <span>${w.position}</span>
              <span class="dates">${w.startDate} – ${w.current ? 'Present' : w.endDate}</span>
            </div>
            <div style="font-size: 9.5pt; font-weight: 600; color: #444;">${w.company}</div>
            <ul>
              ${(w.highlights || []).map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${education.length > 0 ? `
      <div>
        <div class="section-title">Education</div>
        ${education.map(e => `
          <div class="edu-item">
            <div style="font-weight: bold; font-size: 9.5pt;">${e.studyType} in ${e.area}</div>
            <div class="flex-between" style="font-weight: normal; font-size: 9pt; color: #555;">
              <span>${e.institution}</span>
              <span>${e.startDate} – ${e.endDate}</span>
            </div>
          </div>
        `).join('')}
      </div>
      ` : ''}
    </div>

    <div class="side-col">
      <div>
        <div class="section-title">Soft Skills</div>
        <ul style="padding-left: 14px; font-size: 9pt;">
          <li>Analytical thinking and problem solving</li>
          <li>Adaptability & client negotiation</li>
          <li>Resilience under pressure</li>
          <li>Team leadership & collaboration</li>
        </ul>
      </div>

      ${skills.length > 0 ? `
      <div>
        <div class="section-title">Technical Skills</div>
        <div class="skills-grid">
          ${skills.map(s => `<span class="skill-tag"><strong>${s.name}</strong></span>`).join('')}
        </div>
      </div>
      ` : ''}

      <div>
        <div class="section-title">Languages</div>
        <div style="font-size: 9pt; line-height: 1.5; color: #444;">
          <div><strong>English:</strong> Native / Fluent</div>
          <div><strong>French:</strong> Professional Working</div>
        </div>
      </div>
    </div>
  </div>
  ` : `
  <!-- Standard 1-Column ATS Layout -->
  <div>
    ${work.length > 0 ? `
    <div>
      <div class="section-title">Work Experience</div>
      ${work.map(w => `
        <div class="work-item">
          <div class="flex-between">
            <span>${w.position} — ${w.company}</span>
            <span class="dates">${w.startDate} – ${w.current ? 'Present' : w.endDate}</span>
          </div>
          <ul>
            ${(w.highlights || []).map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${education.length > 0 ? `
    <div>
      <div class="section-title">Education</div>
      ${education.map(e => `
        <div class="edu-item flex-between">
          <div>
            <span>${e.studyType} in ${e.area}</span>, 
            <span style="font-weight: normal;">${e.institution}</span>
          </div>
          <span class="dates">${e.startDate} – ${e.endDate}</span>
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${skills.length > 0 ? `
    <div>
      <div class="section-title">Key Skills</div>
      <div class="skills-grid">
        ${skills.map(s => `<span class="skill-tag"><strong>${s.name}</strong> (${s.level})</span>`).join('')}
      </div>
    </div>
    ` : ''}
  </div>
  `}
</body>
</html>
    `
  }
}

export const cvTemplateAdapter = new DefaultCVTemplateAdapter()
