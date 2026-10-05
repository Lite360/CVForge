import type { CVData } from '@/types/cv'
import { cvTemplateAdapter } from './templateAdapter'

export async function exportCVToPDF(cv: CVData, templateId: string = 'professional-ats'): Promise<void> {
  const htmlContent = cvTemplateAdapter.renderHTML(cv, templateId)
  
  // Create offscreen container for html2pdf rendering
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.left = '-9999px'
  container.style.top = '-9999px'
  container.innerHTML = htmlContent
  document.body.appendChild(container)

  try {
    // Dynamic import html2pdf.js for client side generation
    const html2pdf = (await import('html2pdf.js')).default
    const opt = {
      margin: 10,
      filename: `${(cv.basics?.name || 'Resume').replace(/\s+/g, '_')}_CVForge.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    await html2pdf().set(opt).from(container).save()
  } finally {
    document.body.removeChild(container)
  }
}

export async function exportCVToDOCX(cv: CVData): Promise<void> {
  // Generate HTML representation formatted for Word / DOCX compatibility
  const htmlContent = cvTemplateAdapter.renderHTML(cv)
  const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
        "xmlns:w='urn:schemas-microsoft-com:office:word' "+
        "xmlns='http://www.w3.org/TR/REC-html40'>"+
        "<head><meta charset='utf-8'><title>Export DOCX</title></head><body>"
  const footer = "</body></html>"
  const sourceHTML = header + htmlContent + footer
  
  const blob = new Blob(['\ufeff', sourceHTML], {
    type: 'application/msword'
  })

  const filename = `${(cv.basics?.name || 'Resume').replace(/\s+/g, '_')}_CVForge.doc`
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
