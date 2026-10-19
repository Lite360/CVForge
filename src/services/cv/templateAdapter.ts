import type { CVData } from '@/types/cv'

export interface CVTemplateAdapter {
  renderHTML(cv: CVData, templateId?: string): string
}

export class DefaultCVTemplateAdapter implements CVTemplateAdapter {
  renderHTML(cv: CVData, templateId: string = 'executive-modern'): string {
    const basics = cv.basics || {}
    const work = cv.work || []
    const education = cv.education || []
    const skills = cv.skills || []

    const isCompact = templateId === 'compact-ats'
    const isClassic = templateId === 'classic-detailed'
    // Default or executive-modern
    const isExecutive = !isCompact && !isClassic

    if (isCompact) {
      return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${basics.name || 'Resume'} — CVForge</title>
  <style>
    @page { size: A4; margin: 12mm 15mm; }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #111111;
      line-height: 1.35;
      font-size: 10pt;
      margin: 0;
      padding: 0;
    }
    .header { text-align: center; border-bottom: 2px solid #111111; padding-bottom: 6px; margin-bottom: 10px; }
    .name { font-size: 16pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin: 0; }
    .contact { font-size: 8.5pt; color: #444; margin-top: 4px; }
    .section-title { font-size: 10pt; font-weight: bold; text-transform: uppercase; border-bottom: 1.5px solid #333333; padding-bottom: 1px; margin-top: 10px; margin-bottom: 4px; letter-spacing: 0.5px; }
    .item { margin-bottom: 6px; }
    .flex-between { display: flex; justify-content: space-between; align-items: baseline; font-size: 9.5pt; }
    .dates { font-weight: normal; color: #444; font-size: 8.5pt; }
    ul { margin: 2px 0 0 0; padding-left: 14px; }
    li { margin-bottom: 1.5px; font-size: 9pt; }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${basics.name || 'YOUR NAME'}</div>
    <div class="contact">
      ${[basics.email, basics.phone, basics.location, basics.url].filter(Boolean).join('  |  ')}
    </div>
  </div>

  ${basics.summary ? `
  <div>
    <div class="section-title">Professional Summary</div>
    <p style="margin: 0; font-size: 9pt; text-align: justify; line-height: 1.35;">${basics.summary}</p>
  </div>
  ` : ''}

  ${skills.length > 0 ? `
  <div>
    <div class="section-title">Core Skills</div>
    <div style="font-size: 9pt; line-height: 1.4;">
      ${skills.map(s => s.name).join(' | ')}
    </div>
  </div>
  ` : ''}

  ${work.length > 0 ? `
  <div>
    <div class="section-title">Professional Experience</div>
    ${work.map(w => `
      <div class="item">
        <div class="flex-between">
          <span><strong>${w.company}</strong> — <em>${w.position}</em></span>
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
      <div class="item flex-between">
        <div>
          <strong>${e.studyType} in ${e.area}</strong>, 
          <span>${e.institution}</span>
        </div>
        <span class="dates">${e.startDate} – ${e.endDate}</span>
      </div>
    `).join('')}
  </div>
  ` : ''}
</body>
</html>
      `
    }

    if (isClassic) {
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
      color: #1a1a1a;
      line-height: 1.45;
      font-size: 10pt;
      margin: 0;
      padding: 0;
    }
    .header { text-align: center; margin-bottom: 14px; }
    .name { font-size: 18pt; font-weight: bold; letter-spacing: 0.5px; }
    .title { font-size: 11pt; color: #444; font-weight: 600; margin-top: 2px; }
    .contact-bar { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; font-size: 8.5pt; color: #555; margin-top: 6px; padding: 4px 0; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; }
    .section-title { font-size: 10.5pt; font-weight: bold; text-transform: uppercase; border-bottom: 1.5px solid #222; padding-bottom: 2px; margin-top: 14px; margin-bottom: 6px; letter-spacing: 0.5px; }
    .work-item, .edu-item { margin-bottom: 10px; }
    .flex-between { display: flex; justify-content: space-between; align-items: baseline; font-size: 9.5pt; font-weight: bold; }
    .dates { font-weight: normal; color: #555; font-size: 8.5pt; }
    ul { margin: 3px 0 0 0; padding-left: 16px; }
    li { margin-bottom: 2px; font-size: 9pt; }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${basics.name || 'YOUR NAME'}</div>
    <div class="title">${basics.label || 'PROFESSIONAL TITLE'}</div>
    <div class="contact-bar">
      ${basics.phone ? `<span>📞 ${basics.phone}</span>` : ''}
      ${basics.email ? `<span>✉️ ${basics.email}</span>` : ''}
      ${basics.location ? `<span>📍 ${basics.location}</span>` : ''}
      ${basics.url ? `<span>🔗 ${basics.url}</span>` : ''}
    </div>
  </div>

  ${basics.summary ? `
  <div>
    <div class="section-title">Professional Summary</div>
    <p style="margin: 0; font-size: 9pt; text-align: justify;">${basics.summary}</p>
  </div>
  ` : ''}

  ${skills.length > 0 ? `
  <div>
    <div class="section-title">Skills & Competencies</div>
    <div style="font-size: 9pt; line-height: 1.5;">
      <div><strong>Technical & Tools:</strong> ${skills.map(s => s.name).join(', ')}</div>
    </div>
  </div>
  ` : ''}

  ${work.length > 0 ? `
  <div>
    <div class="section-title">Professional Experience</div>
    ${work.map(w => `
      <div class="work-item">
        <div class="flex-between">
          <span>${w.position}</span>
          <span class="dates">${w.startDate} – ${w.current ? 'Present' : w.endDate}</span>
        </div>
        <div style="font-size: 9pt; font-weight: 600; color: #444;">${w.company}</div>
        <ul>
          ${(w.highlights || []).map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${education.length > 0 ? `
  <div>
    <div class="section-title">Education & Credentials</div>
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

  <div>
    <div class="section-title">References</div>
    <div style="font-size: 9pt; color: #555; font-style: italic;">Available upon request</div>
  </div>
</body>
</html>
      `
    }

    // Default: Executive Modern (2-Column layout matching user's template guide)
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
      font-size: 10pt;
      margin: 0;
      padding: 0;
    }
    .header { text-align: center; border-bottom: 2px solid #111111; padding-bottom: 10px; margin-bottom: 14px; }
    .job-title { font-size: 18pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin: 0; }
    .name { font-size: 12pt; font-weight: bold; text-transform: uppercase; color: #222222; margin-top: 3px; }
    .contact { font-size: 8.5pt; color: #555555; margin-top: 5px; }
    .section-title { font-size: 10pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #cccccc; padding-bottom: 2px; margin-top: 12px; margin-bottom: 6px; letter-spacing: 0.5px; }
    .work-item, .edu-item { margin-bottom: 10px; }
    .flex-between { display: flex; justify-content: space-between; align-items: baseline; font-weight: bold; font-size: 9.5pt; }
    .dates { font-weight: normal; color: #555555; font-size: 8.5pt; }
    ul { margin: 3px 0 0 0; padding-left: 16px; }
    li { margin-bottom: 2px; font-size: 9pt; }
    .container { display: flex; gap: 20px; }
    .main-col { flex: 7; }
    .side-col { flex: 5; border-left: 1px solid #e0e0e0; padding-left: 16px; }
    .skills-grid { display: flex; flex-wrap: wrap; gap: 4px 6px; font-size: 8.5pt; }
    .skill-tag { background: #f3f3f3; padding: 2px 6px; border-radius: 3px; }
  </style>
</head>
<body>
  <div class="header">
    <h1 class="job-title">${basics.label || 'PROFESSIONAL TITLE'}</h1>
    <div class="name">${basics.name || 'YOUR NAME'}</div>
    <div class="contact">
      ${[basics.phone, basics.email, basics.location, basics.url].filter(Boolean).join('  •  ')}
    </div>
  </div>

  ${basics.summary ? `
  <div style="margin-bottom: 12px;">
    <div class="section-title">Professional Summary</div>
    <p style="margin: 0; font-size: 9pt; text-align: justify;">${basics.summary}</p>
  </div>
  ` : ''}

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
            <div style="font-size: 9pt; font-weight: 600; color: #444;">${w.company}</div>
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
            <div style="font-weight: bold; font-size: 9pt;">${e.studyType} in ${e.area}</div>
            <div class="flex-between" style="font-weight: normal; font-size: 8.5pt; color: #555;">
              <span>${e.institution}</span>
              <span>${e.startDate} – ${e.endDate}</span>
            </div>
          </div>
        `).join('')}
      </div>
      ` : ''}
    </div>

    <div class="side-col">
      ${skills.length > 0 ? `
      <div>
        <div class="section-title">Skills & Tools</div>
        <div class="skills-grid">
          ${skills.map(s => `<span class="skill-tag"><strong>${s.name}</strong></span>`).join('')}
        </div>
      </div>
      ` : ''}

      <div>
        <div class="section-title">Languages</div>
        <div style="font-size: 8.5pt; line-height: 1.5; color: #444;">
          <div><strong>English:</strong> Native / Fluent</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
    `
  }
}

export const cvTemplateAdapter = new DefaultCVTemplateAdapter()
