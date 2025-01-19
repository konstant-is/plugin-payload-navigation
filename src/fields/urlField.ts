import type { Field, FieldHook } from 'payload'

import type { CreatePluginField, NavigationPluginConfig, UrlFieldConfig } from '../types.js'

import { generateUrl } from '../utils/generateUrl.js'

const validateUrlField =
  (pluginConfig: NavigationPluginConfig, config: UrlFieldConfig): FieldHook =>
  ({ data }) => {
    const useNestedDocs = pluginConfig.nestedDocsPlugin !== undefined
    const url = generateUrl(config, data, useNestedDocs)

    return url
  }

export const createUrlField: CreatePluginField<UrlFieldConfig, Field> = (
  pluginConfig,
  fieldConfig,
) => {
  return {
    name: fieldConfig.fieldName,
    type: 'text',
    admin: {
      description: 'Automatically generated url',
      position: 'sidebar',
      readOnly: true,
    },
    defaultValue: '',
    hooks: {
      beforeValidate: [validateUrlField(pluginConfig, fieldConfig)],
    },
    index: false, // Not indexed by default
    localized: true, // Supports localization
    required: true,
  }
}
