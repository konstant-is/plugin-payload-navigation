import type { CheckboxField, Field, FieldHook, TextField } from 'payload'

import type { SlugFieldConfig } from '../types.js'

import { getPluginPath } from '../utils/getPluginPath.js'
import { slugify } from '../utils/slugify.js'

type Props = {
  checkboxOverrides?: Partial<CheckboxField>
  config: SlugFieldConfig
  slugOverrides?: Partial<TextField>
}

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

    const separator = config.slugify.replacement ?? '-'

    // Generate the slug using slugify
    const processedSlug = fields
      .filter((item) => Boolean(item)) // Remove null/undefined values
      .map((fieldValue) => slugify(String(fieldValue), config.slugify)) // Slugify each field
      .join(separator) // Join the slugified parts

    return processedSlug
  }

export const createSlugField = (props: Props): Field[] => {
  const { checkboxOverrides = {}, config, slugOverrides = {} } = props || {}
  const { useFields = ['title'] } = config
  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,
    ...checkboxOverrides,
    admin: {
      hidden: true,
      position: 'sidebar',
      ...checkboxOverrides.admin,
    },
  }

  const slugField: TextField = {
    name: 'slug',
    type: 'text',
    admin: {
      components: {
        Field: {
          path: getPluginPath('client', '#SlugFieldClient'),

          clientProps: {
            custom: {
              checkboxFieldPath: checkBoxField.name,
              watchFields: useFields,
            },
          },
        },
      },
      position: 'sidebar',
    },
    hooks: {
      beforeValidate: [validateSlug(config)],
    },
    index: true,
    localized: true,
    // required: true,
    unique: true,
  }

  return [slugField, checkBoxField]
}
