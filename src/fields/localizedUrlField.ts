import type { Field } from 'payload'

import type { LocalizedUrlFieldConfig } from '../types.js'

export const createLocalizedUrlField = (config: LocalizedUrlFieldConfig): Field => {
  return {
    name: config.fieldName,
    type: 'group',
    admin: {
      description: 'Automatically generated localized urls.',
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
  }
}
