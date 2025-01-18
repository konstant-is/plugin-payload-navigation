import type {
  LocalizedSlugFieldConfig,
  LocalizedUrlFieldConfig,
  NavigationPluginConfig,
  SlugFieldConfig,
  UrlFieldConfig,
} from '../types.js'

const createSlugFieldConfig = (
  config: Partial<SlugFieldConfig> = {},
  defaults: { fieldName: string; locales: string[]; lockFieldName: string },
): SlugFieldConfig => ({
  fieldName: config.fieldName || defaults.fieldName,
  lockFieldName: config.lockFieldName || defaults.lockFieldName,
  useFields: config.useFields || ['title'],

  slugify: {
    locale: 'en',
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    replacement: '-',
    strict: false,
    trim: true,
    ...(config.slugify || {}),
  },
})

const createLocalizedSlugFieldConfig = (
  config: Partial<LocalizedSlugFieldConfig> = {},
  defaults: { fieldName: string; locales: string[]; sourceFieldName: string },
): LocalizedSlugFieldConfig => ({
  fieldName: config.fieldName || defaults.fieldName,
  locales: config.locales || defaults.locales,
  sourceField: config.sourceField || defaults.sourceFieldName,
})

export const createUrlFieldConfig = (
  config: Partial<UrlFieldConfig> = {},
  defaults: UrlFieldConfig,
): UrlFieldConfig => ({
  fieldName: config.fieldName || defaults.fieldName,
  generateUrl: config.generateUrl,
})

const createLocalizedUrlFieldConfig = (
  config: Partial<LocalizedUrlFieldConfig> = {},
  defaults: LocalizedUrlFieldConfig,
): LocalizedUrlFieldConfig => ({
  ...defaults,
  ...(config || {}),
})

export const createFieldConfigs = (pluginConfig: NavigationPluginConfig, locales: string[]) => {
  const { fields = {} } = pluginConfig

  const slugFieldConfig = createSlugFieldConfig(fields.slugField, {
    fieldName: 'slug',
    locales,
    lockFieldName: 'slugLock',
  })

  const localizedSlugFieldConfig = createLocalizedSlugFieldConfig(fields.localizedSlugField, {
    fieldName: 'slugs',
    locales,
    sourceFieldName: slugFieldConfig.fieldName,
  })

  const urlFieldConfig = createUrlFieldConfig(fields.urlField, {
    fieldName: 'url',
  })

  const localizedUrlFieldConfig = createLocalizedUrlFieldConfig(fields.localizedUrlField, {
    fieldName: 'urls',
    locales,
    sourceField: urlFieldConfig.fieldName,
  })

  return {
    localizedSlugFieldConfig,
    localizedUrlFieldConfig,
    slugFieldConfig,
    urlFieldConfig,
  }
}
