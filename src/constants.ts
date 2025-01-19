import type { SlugifyOptions } from './types.js'

export const PLUGIN_PATH = 'payload-plugin-navigation'
export const DEFAULT_LOCALE = 'en'

export const DEFAULT_SLUGIFY_OPTIONS: Required<SlugifyOptions> = {
  locale: 'en',
  lower: true,
  remove: /[*+~.()'"!:@]/g,
  replacement: '-',
  strict: false,
  trim: true,
}
