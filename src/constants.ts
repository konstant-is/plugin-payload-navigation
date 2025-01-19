import type {
  AppendLocaleToUrlOptions,
  LocalizedSlugFieldConfig,
  LocalizedUrlFieldConfig,
  PermalinkFieldConfig,
  SlugFieldConfig,
  SlugifyOptions,
  UrlFieldConfig,
} from './types.js'

export const PLUGIN_PATH = 'payload-plugin-navigation'

const defaultLocale = 'en'
export const defaultSlugify: Required<SlugifyOptions> = {
  locale: defaultLocale,
  lower: true,
  remove: /[*+~.()'"!:@]/g,
  replacement: '-',
  strict: false,
  trim: true,
}
type DefaultValues = {
  appendLocaleToUrl: AppendLocaleToUrlOptions
  fields: {
    localizedSlug: LocalizedSlugFieldConfig
    localizedUrlField: LocalizedUrlFieldConfig
    permalink: PermalinkFieldConfig
    slug: SlugFieldConfig
    url: UrlFieldConfig
  }
  locale: string
  slugify: Required<SlugifyOptions>
}
export const defaultValues: DefaultValues = {
  appendLocaleToUrl: 'exclude-default',
  fields: {
    slug: {
      fieldName: 'slug',
      lockFieldName: 'slugLock',
      slugify: defaultSlugify,
      useFields: ['title'],
    },
    localizedSlug: {
      fieldName: 'slugs',
      locales: [defaultLocale],
      sourceField: 'slug',
    },
    localizedUrlField: {
      fieldName: 'urls',
      locales: [defaultLocale],
      sourceField: 'url',
    },
    permalink: {
      fieldName: 'permalink',
      sourceField: 'url',
    },
    url: {
      fieldName: 'url',
    },
  },
  locale: defaultLocale,
  slugify: defaultSlugify,
}
