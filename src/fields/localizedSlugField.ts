import type { Field } from 'payload'

import type { LocalizedSlugFieldConfig } from '../types.js'

export const createLocalizedSlugsField = (config: LocalizedSlugFieldConfig): Field => ({
  name: config.fieldName,
  type: 'group',
  admin: {
    description: 'Automatically generated localized slugs.',
    readOnly: true,
  },
  fields: config.locales.map((locale) => ({
    name: locale,
    type: 'text',
    defaultValue: '',
    localized: false,
    // required: true,
  })),
  localized: false,
})
