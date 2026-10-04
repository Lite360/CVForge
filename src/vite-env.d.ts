declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'html2pdf.js' {
  const html2pdf: any
  export default html2pdf
}
