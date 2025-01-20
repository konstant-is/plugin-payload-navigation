import type { Field, FieldHook } from 'payload'
import type { PluginContext } from 'src/utils/createPluginContext.js'

import type { CreatePluginField, UrlFieldConfig } from '../types.js'

import { generateUrl } from '../utils/generateUrl.js'

const validateUrlField =
  (context: PluginContext): FieldHook =>
  ({ data }) => {
    const url = generateUrl(context, data)

    return url
  }

export const createUrlField: CreatePluginField<UrlFieldConfig, Field> = ({
  context,
  fieldConfig,
}) => {
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
      beforeValidate: [validateUrlField(context)],
    },
    index: false, // Not indexed by default
    localized: true, // Supports localization
    required: true,
  }
}
