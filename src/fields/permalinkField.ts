import type { Field } from 'payload'

import type { PermalinkFieldConfig } from '../types.js'

import { getPluginPath } from '../utils/getPluginPath.js'

export const createPermalinkField = (config: PermalinkFieldConfig): Field => {
  return {
    name: config.fieldName,
    type: 'ui',
    admin: {
      components: {
        Field: {
          clientProps: {
            custom: {
              sourceField: config.sourceField,
            },
          },
          path: getPluginPath('client', '#PermalinkField'),
        },
      },
    },
  }
}
