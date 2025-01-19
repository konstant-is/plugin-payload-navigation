import type {
  LocalizedSlugFieldConfig,
  LocalizedUrlFieldConfig,
  NavigationPluginConfig,
  PermalinkFieldConfig,
  SlugFieldConfig,
  UrlFieldConfig,
} from '../types.js'

import { defaultValues } from '../constants.js'

type CreateFieldConfig<T> = (config: Partial<T> | undefined, injected?: Partial<T>) => T

const createSlugFieldConfig: CreateFieldConfig<SlugFieldConfig> = (
  config = {},
): SlugFieldConfig => ({
  ...defaultValues.fields.slug,
  slugify: { ...defaultValues.slugify, ...config.slugify },
})

const createLocalizedSlugFieldConfig: CreateFieldConfig<LocalizedSlugFieldConfig> = (
  config = {},
  injected = {},
): LocalizedSlugFieldConfig => ({
  ...defaultValues.fields.localizedSlug,
  ...injected,
  ...config,
})

export const createUrlFieldConfig: CreateFieldConfig<UrlFieldConfig> = (
  config: Partial<UrlFieldConfig> = {},
  injected = {},
): UrlFieldConfig => ({
  ...defaultValues.fields.url,
  ...injected,
  ...config,
})

const createLocalizedUrlFieldConfig: CreateFieldConfig<LocalizedUrlFieldConfig> = (
  config = {},
  injected = {},
) => ({
  ...defaultValues.fields.localizedUrlField,
  ...injected,
  ...config,
})

const createPermalinkFieldConfig: CreateFieldConfig<PermalinkFieldConfig> = (
  config = {},
  injected = {},
) => ({
  ...defaultValues.fields.permalink,
  ...injected,
  ...config,
})

export const createFieldConfigs = (pluginConfig: NavigationPluginConfig, locales: string[]) => {
  const fields: NavigationPluginConfig['fields'] = pluginConfig.fields || {}

  const slugFieldConfig = createSlugFieldConfig(fields.slug)
  const localizedSlugFieldConfig = createLocalizedSlugFieldConfig(fields.localizedSlug, {
    locales,
    sourceField: slugFieldConfig.fieldName,
  })
  const urlFieldConfig = createUrlFieldConfig(fields.url)
  const localizedUrlFieldConfig = createLocalizedUrlFieldConfig(fields.localizedUrl, {
    locales,
    sourceField: urlFieldConfig.fieldName,
  })
  const permalinkFieldConfig = createPermalinkFieldConfig(fields.permalink, {
    sourceField: urlFieldConfig.fieldName,
  })

  return {
    localizedSlugFieldConfig,
    localizedUrlFieldConfig,
    permalinkFieldConfig,
    slugFieldConfig,
    urlFieldConfig,
  }
}
