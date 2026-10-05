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

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${basics.name || 'Resume'
      } — CVForge</title>
  <style>
    @page { size: A4; margin: 20mm; }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #111111;
      line-height: 1.5;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }
    .header { text-align: center; border-bottom: 2px solid #111111; padding-bottom: 12px; margin-bottom: 20px; }
    .name { font-size: 22pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0; }
    .title { font-size: 12pt; font-weight: bold; color: #444444; margin-top: 4px; }
    .contact { font-size: 9.5pt; color: #555555; margin-top: 6px; }
    .section-title { font-size: 11pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #cccccc; padding-bottom: 3px; margin-top: 18px; margin-bottom: 8px; letter-spacing: 0.5px; }
    .work-item, .edu-item { margin-bottom: 12px; }
    .flex-between { display: flex; justify-content: space-between; align-items: baseline; font-weight: bold; font-size: 10.5pt; }
    .dates { font-weight: normal; color: #555555; font-size: 9.5pt; }
    ul { margin: 4px 0 0 0; padding-left: 18px; }
    li { margin-bottom: 3px; font-size: 10pt; }
    .skills-grid { display: flex; flex-wrap: wrap; gap: 8px 16px; font-size: 10pt; }
  </style>
</head>
<body>
  <div class="header">
    <h1 class="name">${basics.name || 'YOUR NAME'
      }</h1>
    <div class="title">${basics.label || 'Professional Title'
      }</div>
    <div class="contact">
      ${[basics.email, basics.phone, basics.location, basics.url].filter(Boolean).join('  •  ')
      }
    </div>
  </div>

  ${basics.summary ? `
  <div>
    <div class="section-title">Professional Summary</div>
    <p style="margin: 0; font-size: 10pt;">${basics.summary
        }</p>
  </div>
  ` : ''
      }

  ${work.length > 0 ? `
  <div>
    <div class="section-title">Work Experience</div>
    ${work.map(
        w => `
      <div class="work-item">
        <div class="flex-between">
          <span>${w.position
          } — ${w.company
          }</span>
          <span class="dates">${w.startDate
          } – ${w.current ? 'Present' : w.endDate
          }</span>
        </div>
        <ul>
          ${(w.highlights || []).map(h => `<li>${h}</li>`).join('')
          }
        </ul>
      </div>
    `
      ).join('')
        }
  </div>
  ` : ''
      }

  ${education.length > 0 ? `
  <div>
    <div class="section-title">Education</div>
    ${education.map(e => `
      <div class="edu-item flex-between">
        <div>
          <span>${e.studyType
        } in ${e.area
        }</span>, 
          <span style="font-weight: normal;">${e.institution
        }</span>
        </div>
        <span class="dates">${e.startDate
        } – ${e.endDate
        }</span>
      </div>
    `).join('')
        }
  </div>
  ` : ''
      }

  ${skills.length > 0 ? `
  <div>
    <div class="section-title">Key Skills</div>
    <div class="skills-grid">
      ${skills.map(s => `<span><strong>${s.name
        }</strong> (${s.level
        })</span>`).join('')
        }
    </div>
  </div>
  ` : ''
      }
</body>
</html>
    `
  }
}

export const cvTemplateAdapter = new DefaultCVTemplateAdapter()
