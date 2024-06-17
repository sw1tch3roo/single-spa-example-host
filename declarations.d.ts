declare module '*.html' {
  const rawHtmlFile: string
  export = rawHtmlFile
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module 'rollup-plugin-string'
