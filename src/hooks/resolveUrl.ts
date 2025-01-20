import type { CollectionBeforeChangeHook } from 'payload'
import type { PluginContext } from 'src/utils/createPluginContext.js'

import { generateLocalizedUrl } from 'src/utils/generateUrl.js'

export const resolveUrl =
  (context: PluginContext): CollectionBeforeChangeHook =>
  ({ data, req }) => {
    const { urlFieldConfig } = context.fieldConfigs

    // Resolve the final URL by appending locale if needed
    const url = generateLocalizedUrl({
      context,
      data,
      req,
    })

    return {
      ...data,
      [urlFieldConfig.fieldName]: url,
    }
  }
