import type {
  LocalizedSlugFieldConfig,
  LocalizedUrlFieldConfig,
  NavigationPluginConfig,
  PermalinkFieldConfig,
  SlugFieldConfig,
  UrlFieldConfig,
} from '../types.js'

import { DEFAULT_SLUGIFY_OPTIONS } from '../constants.js'

type CreateFieldConfig<T> = (config: Partial<T> | undefined, defaultConfig?: Partial<T>) => T

const createSlugFieldConfig: CreateFieldConfig<SlugFieldConfig> = (
  config = {},
  defaultConfig = {},
): SlugFieldConfig => ({
  fieldName: 'slug',
  lockFieldName: 'slugLock',
  useFields: ['title'],
  ...defaultConfig,
  ...config,
  slugify: { ...DEFAULT_SLUGIFY_OPTIONS, ...config.slugify },
})

const createLocalizedSlugFieldConfig: CreateFieldConfig<LocalizedSlugFieldConfig> = (
  config = {},
  defaultConfig = {},
): LocalizedSlugFieldConfig => ({
  fieldName: 'slugs',
  locales: [],
  ...defaultConfig,
  ...config,
})

export const createUrlFieldConfig: CreateFieldConfig<UrlFieldConfig> = (
  config: Partial<UrlFieldConfig> = {},
  defaultConfig = {},
): UrlFieldConfig => ({
  fieldName: 'url',
  generateUrl: undefined,
  ...defaultConfig,
  ...config,
})

const createLocalizedUrlFieldConfig: CreateFieldConfig<LocalizedUrlFieldConfig> = (
  config = {},
  defaultConfig = {},
) => ({
  fieldName: 'urls',
  locales: [],
  ...defaultConfig,
  ...config,
})

const createPermalinkFieldConfig: CreateFieldConfig<PermalinkFieldConfig> = (
  config = {},
  defaultConfig = {},
) => ({
  fieldName: 'permalink',
  ...defaultConfig,
  ...config,
})

export const createFieldConfigs = (pluginConfig: NavigationPluginConfig, locales: string[]) => {
  const fields: NavigationPluginConfig['fields'] = pluginConfig.fields || {}

  const slugFieldConfig = createSlugFieldConfig(fields.slug)

  const localizedSlugFieldConfig = createLocalizedSlugFieldConfig(fields.localizedSlug, {
    locales,
    sourceField: slugFieldConfig.fieldName,
  })

  const urlFieldConfig = createUrlFieldConfig(fields.url, {
    fieldName: 'url',
  })

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
