import type { Field } from 'payload'

import type { NavigationPluginConfig } from '../types.js'

import {
  createLocalizedSlugsField,
  createLocalizedUrlField,
  createPermalinkField,
  createSlugField,
  createUrlField,
} from '../fields/index.js'
import { createFieldConfigs } from './createFieldConfigs.js'

export const enhanceFields = ({
  fields,
  locales,
  pluginConfig,
}: {
  fields: Field[]
  locales: string[]
  pluginConfig: NavigationPluginConfig
}) => {
  // Generate configurations
  const {
    localizedSlugFieldConfig,
    localizedUrlFieldConfig,
    permalinkFieldConfig,
    slugFieldConfig,
    urlFieldConfig,
  } = createFieldConfigs(pluginConfig, locales)

  let updatedFields = [...fields] // Start with a copy of the existing fields
  const usePermalink = pluginConfig.options?.usePermalink || true

  // Create index for fast lookups
  const indexedFields = fields.reduce(
    (index, field) => {
      if ('name' in field && typeof field.name === 'string') {
        index[field.name] = field
      }
      return index
    },
    {} as Record<string, Field>,
  )

  const addFields = (newFields: Field[]) => {
    newFields.forEach((field) => {
      if ('name' in field && typeof field.name === 'string') {
        if (!indexedFields[field.name]) {
          updatedFields.push(field)
          indexedFields[field.name] = field
        }
      } else {
        console.warn('Field without a name encountered. Skipping:', field)
      }
    })
  }

  // Add slug fields
  if (!indexedFields[slugFieldConfig.fieldName]) {
    const slugFields = createSlugField(pluginConfig, slugFieldConfig)
    addFields(slugFields) // Handles multiple slug-related fields
  }

  // Add localized slug fields
  if (!indexedFields[localizedSlugFieldConfig.fieldName]) {
    const localizedField = createLocalizedSlugsField(localizedSlugFieldConfig)
    addFields([localizedField])
  }

  // Add URL fields
  if (!indexedFields[urlFieldConfig.fieldName]) {
    const field = createUrlField(pluginConfig, urlFieldConfig)
    addFields([field])
  }

  // Add Localized URL field
  if (!indexedFields[localizedUrlFieldConfig.fieldName]) {
    const field = createLocalizedUrlField(localizedUrlFieldConfig)
    addFields([field])
  }

  if (usePermalink && !indexedFields[permalinkFieldConfig.fieldName]) {
    const field = createPermalinkField(pluginConfig, permalinkFieldConfig)

    updatedFields = [field, ...updatedFields]
  }

  return {
    configs: {
      localizedSlugFieldConfig,
      localizedUrlFieldConfig,
      slugFieldConfig,
      urlFieldConfig,
    },
    fields: updatedFields,
  }
}
