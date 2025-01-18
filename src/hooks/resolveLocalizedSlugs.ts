import type { CollectionBeforeChangeHook } from 'payload'

import type { LocalizedSlugFieldConfig } from '../types.js'

import { DEFAULT_LOCALE } from '../constants.js'

export const resolveLocalizedSlugs =
  (config: LocalizedSlugFieldConfig): CollectionBeforeChangeHook =>
  ({ data, operation, req }) => {
    const { locale, payload } = req
    const { defaultLocale = DEFAULT_LOCALE } = payload.config.localization || {}
    const currentLocale = locale || defaultLocale

    if (operation === 'create') {
      return data
    }

    // Fetch source field value
    const sourceField = config.sourceField ? data[config.sourceField] : undefined
    if (!sourceField) {
      payload.logger.error(
        `Error: Missing source field "${config.sourceField}" while populating localized slugs.`,
      )

      return data
    }

    // Fetch or initialize the localized slugs field
    const localizedSlugField = data[config.fieldName] || {}
    if (typeof localizedSlugField !== 'object') {
      payload.logger.error(`Error: Localized slugs field "${config.fieldName}" is not an object.`)
      return data
    }

    // Update the localized field with the current locale's slug
    const updatedLocalizedField = {
      ...localizedSlugField,
      [currentLocale]: sourceField,
    }

    // Log successful operation
    payload.logger.info(
      `Localized slug updated for locale "${currentLocale}" in field "${config.fieldName}".`,
    )

    return {
      ...data,
      [config.fieldName]: updatedLocalizedField,
    }
  }
