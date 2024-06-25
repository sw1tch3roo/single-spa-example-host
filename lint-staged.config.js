export default {
  '**/*.(ts|tsx|js)': (filenames) => [
    `pnpm fix-eslint ${filenames.join(' ')}`,
    `pnpm format ${filenames.join(' ')}`
  ],

  '**/*.(md|json)': (filenames) => `pnpm format ${filenames.join(' ')}`
}
