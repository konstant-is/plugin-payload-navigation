import type { Config } from 'payload'

import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

import type { NavigationPluginConfig } from './types.js'

import { createPermalinkField } from './fields/permalinkField.js'
import { resolveLocalizedSlugs, resolveLocalizedUrl, resolveUrl } from './hooks/index.js'
import { enhanceFields } from './utils/enhanceFields.js'
import { getLocales } from './utils/getLocals.js'
import { mergeHooks } from './utils/mergeHooks.js'

export const navigationPlugin =
  (pluginConfig: NavigationPluginConfig) =>
  async (config: Config): Promise<Config> => {
    if (pluginConfig.disabled) {
      return config
    }

    const locales = getLocales(config)

    let enhancedConfig = config

    if (pluginConfig.nestedDocsPlugin) {
      // Integrate nestedDocsPlugin and await its result
      enhancedConfig = await nestedDocsPlugin({
        collections: pluginConfig.collections,
        ...pluginConfig.nestedDocsPlugin,
      })(enhancedConfig)
    }

    return createPlugin({
      config: enhancedConfig,
      locales,
      pluginConfig,
    })
  }

const createPlugin = ({
  config,
  locales,
  pluginConfig,
}: {
  config: Config
  locales: string[]
  pluginConfig: NavigationPluginConfig
}) => ({
  ...config,
  collections: (config.collections || []).map((collection) => {
    if (!pluginConfig.collections.includes(collection.slug)) {
      return collection // Skip collections not included in the plugin config
    }

    // Enhance fields and configurations
    const { configs, fields } = enhanceFields({
      config: pluginConfig,
      fields: collection.fields,
      locales,
    })

    // // Optionally add the permalink field
    // const permalinkField =
    //   pluginConfig.options?.usePermalink &&
    //   createPermalinkField({
    //     fieldName: 'permalink',
    //     sourceField: configs.urlFieldConfig.fieldName,
    //   })

    return {
      ...collection,
      fields,
      hooks: {
        ...(collection.hooks || {}),
        beforeChange: mergeHooks(
          [
            resolveUrl(pluginConfig, configs.urlFieldConfig),
            resolveLocalizedUrl(configs.localizedUrlFieldConfig),
            resolveLocalizedSlugs(configs.localizedSlugFieldConfig),
          ],
          collection.hooks?.beforeChange,
        ),
      },
    }
  }),
})
// export const navigation =
//   (pluginOptions: NavigationPluginConfig) =>
//   (config: Config): Config => {
//     if (!config.collections) {
//       config.collections = []
//     }

//     config.collections.push({
//       slug: 'plugin-collection',
//       fields: [
//         {
//           name: 'id',
//           type: 'text',
//         },
//       ],
//     })

//     if (pluginOptions.collections) {
//       for (const collectionSlug in pluginOptions.collections) {
//         const collection = config.collections.find(
//           (collection) => collection.slug === collectionSlug,
//         )

//         if (collection) {
//           collection.fields.push({
//             name: 'addedByPlugin',
//             type: 'text',
//             admin: {
//               position: 'sidebar',
//             },
//           })
//         }
//       }
//     }

//     /**
//      * If the plugin is disabled, we still want to keep added collections/fields so the database schema is consistent which is important for migrations.
//      * If your plugin heavily modifies the database schema, you may want to remove this property.
//      */
//     if (pluginOptions.disabled) {
//       return config
//     }

//     if (!config.endpoints) {
//       config.endpoints = []
//     }

//     if (!config.admin) {
//       config.admin = {}
//     }

//     if (!config.admin.components) {
//       config.admin.components = {}
//     }

//     if (!config.admin.components.beforeDashboard) {
//       config.admin.components.beforeDashboard = []
//     }

//     config.admin.components.beforeDashboard.push(`navigation/client#BeforeDashboardClient`)
//     config.admin.components.beforeDashboard.push(`navigation/rsc#BeforeDashboardServer`)

//     config.endpoints.push({
//       handler: () => {
//         return Response.json({ message: 'Hello from custom endpoint' })
//       },
//       method: 'get',
//       path: '/my-plugin-endpoint',
//     })

//     const incomingOnInit = config.onInit

//     config.onInit = async (payload) => {
//       // Ensure we are executing any existing onInit functions before running our own.
//       if (incomingOnInit) {
//         await incomingOnInit(payload)
//       }

//       const { totalDocs } = await payload.count({
//         collection: 'plugin-collection',
//         where: {
//           id: {
//             equals: 'seeded-by-plugin',
//           },
//         },
//       })

//       if (totalDocs === 0) {
//         await payload.create({
//           collection: 'plugin-collection',
//           data: {
//             id: 'seeded-by-plugin',
//           },
//         })
//       }
//     }

//     return config
//   }
