import type { CheckboxField, Field, FieldHook, TextField } from 'payload'

import type { CreatePluginField, SlugFieldConfig } from '../types.js'
import type { PluginContext } from '../utils/createPluginContext.js'

import { getPluginPath } from '../utils/getPluginPath.js'
import { generateSlug, normalizeSlugOptions } from '../utils/slugify.js'

export const validateSlug =
  (context: PluginContext): FieldHook =>
  ({ data, req, siblingData, value }) => {
    const { slugFieldConfig } = context.fieldConfigs

    // If the slug is locked, return the existing value
    if (!siblingData[slugFieldConfig.lockFieldName]) {
      return value
    }

    const missingFields: string[] = []

    // Collect values of the fields used for slug generation
    const fields = slugFieldConfig.useFields.map((field) => {
      const fieldValue = data?.[field] || null

      if (!fieldValue) {
        missingFields.push(field) // Track missing fields
      }

      return fieldValue
    })

    // If any required fields are missing, log and return the original value
    if (missingFields.length > 0) {
      req.payload.logger.warn('Missing fields for slug generation:', missingFields)
      return value
    }

    // Generate the slug using slugify
    const processedSlug = generateSlug(fields, context.slugifyOptions)

    return processedSlug
  }

export const createSlugField: CreatePluginField<SlugFieldConfig, Field[]> = ({
  context,
  fieldConfig,
}): Field[] => {
  const { useFields = ['title'] } = fieldConfig

  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,

    admin: {
      hidden: true,
      position: 'sidebar',
    },
  }

  const slugField: TextField = {
    name: 'slug',
    type: 'text',
    admin: {
      components: {
        Field: {
          clientProps: {
            custom: {
              checkboxFieldPath: checkBoxField.name,
              slugifyOptions: normalizeSlugOptions(context.slugifyOptions),
              watchFields: useFields,
            },
          },
          path: getPluginPath('client', '#SlugFieldClient'),
        },
      },
      position: 'sidebar',
    },
    hooks: {
      beforeValidate: [validateSlug(context)],
    },
    index: true,
    localized: true,
    required: true,
    unique: true,
  }

  return [slugField, checkBoxField]
}
