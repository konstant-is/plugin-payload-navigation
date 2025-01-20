import type { CheckboxField, Field, FieldHook, TextField } from 'payload'

import type { CreatePluginField, SlugFieldConfig } from '../types.js'

import { getPluginPath } from '../utils/getPluginPath.js'
import { generateSlug } from '../utils/slugify.js'

export const validateSlug =
  (config: SlugFieldConfig): FieldHook =>
  ({ data, req, siblingData, value }) => {
    const slugLock = siblingData[config.lockFieldName]

    // If the slug is locked, return the existing value
    if (!slugLock) {
      return value
    }

    const missingFields: string[] = []

    // Collect values of the fields used for slug generation
    const fields = config.useFields.map((field) => {
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
    const processedSlug = generateSlug(fields, config.slugify)

    return processedSlug
  }

export const createSlugField: CreatePluginField<SlugFieldConfig, Field[]> = ({
  fieldConfig,
}): Field[] => {
  const { useFields = ['title'] } = fieldConfig

  const { remove, ...slugifyRest } = fieldConfig.slugify
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
              // Need to pass REGEX as a string to client
              slugifyOptions: { ...slugifyRest, remove: `${remove}` },
              watchFields: useFields,
            },
          },
          path: getPluginPath('client', '#SlugFieldClient'),
        },
      },
      position: 'sidebar',
    },
    hooks: {
      beforeValidate: [validateSlug(fieldConfig)],
    },
    index: true,
    localized: true,
    required: true,
    unique: true,
  }

  return [slugField, checkBoxField]
}
