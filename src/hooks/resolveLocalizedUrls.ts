import type { CollectionBeforeChangeHook } from 'payload'

import type { LocalizedUrlFieldConfig } from '../types.js'

import { defaultValues } from '../constants.js'

export const resolveLocalizedUrl =
  (config: LocalizedUrlFieldConfig): CollectionBeforeChangeHook =>
  ({ data, operation, req }) => {
    const { locale, payload } = req
    const { defaultLocale = defaultValues.locale } = payload.config.localization || {}
    const currentLocale = locale || defaultLocale

    if (operation === 'create') {
      return data
    }

    const sourceField = config.sourceField ? data[config.sourceField] : undefined
    if (!sourceField) {
      payload.logger.error(
        `Error: Missing source field "${config.sourceField}" while resolving localized url.`,
      )

      return data
    }

    const field = data[config.fieldName] || {}
    if (typeof field !== 'object') {
      payload.logger.error(`Error: Localized url field "${config.fieldName}" is not an object.`)
      return data
    }

    const updated = {
      ...field,
      [currentLocale]: sourceField,
    }

    return {
      ...data,
      [config.fieldName]: updated,
    }
  }
