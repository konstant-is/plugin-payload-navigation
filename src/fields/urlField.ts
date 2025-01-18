import type { Field } from 'payload'

import type { UrlFieldConfig } from '../types.js'

export const createUrlField = (config: UrlFieldConfig): Field => {
  return {
    name: config.fieldName,
    type: 'text',
    admin: {
      position: 'sidebar',
      readOnly: true,
    },
    defaultValue: '',
    index: false, // Not indexed by default
    localized: true, // Supports localization
    // required: true,
  }
}
