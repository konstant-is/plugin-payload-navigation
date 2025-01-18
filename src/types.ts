import type { NestedDocsPluginConfig } from '@payloadcms/plugin-nested-docs/types'
import type { CollectionSlug } from 'payload'

export type AppendLocaleToUrlOptions = 'all' | 'exclude-default' | 'none'

export type NavigationPluginConfig = {
  /**
   * Collections this plugin should extend. If you need different configs for different collections, this plugin can be added to your config more than once with different collections.
   */
  collections: CollectionSlug[]
  disabled?: boolean
  /**
   * Configuration for slug and URL fields.
   */
  fields?: {
    localizedSlugField?: Partial<LocalizedSlugFieldConfig>
    localizedUrlField?: Partial<LocalizedUrlFieldConfig>
    slugField?: Omit<Partial<SlugFieldConfig>, 'slugify'>
    urlField?: Partial<UrlFieldConfig>
  }
  /**
   * Configuration for nested document support.
   */
  nestedDocsPlugin?: Omit<NestedDocsPluginConfig, 'collections'>
  /**
   * Options for handling URL generation.
   */
  options?: {
    appendLocaleToUrl?: AppendLocaleToUrlOptions
    slugify?: SlugifyOptions // Options for the slugify function
    usePermalink?: boolean
  }
}

// Base configuration type for fields
type BaseFieldConfig = {
  fieldName: string // Name of the field
  sourceField?: string // Optional source field for some configurations
}

// Common configuration for localized fields
type LocalizedFieldConfig = {
  locales: string[] // Locales for localization
} & BaseFieldConfig

// Provides additional options for the slugify function
export type SlugifyOptions = {
  locale?: string
  lower?: boolean
  remove?: RegExp
  replacement?: string
  strict?: boolean
  trim?: boolean
}

// Configuration for localized slug fields
export type LocalizedSlugFieldConfig = LocalizedFieldConfig

// Configuration for localized URL fields
export type LocalizedUrlFieldConfig = LocalizedFieldConfig

// Configuration for regular slug fields
export type SlugFieldConfig = {
  lockFieldName: string // Field to store the lock status
  slugify: SlugifyOptions // Options for the slugify function
  useFields: string[] // Fields to generate the slug from
} & BaseFieldConfig

// Type for a function that generates URLs
type GenerateURL = (data: Record<string, unknown>) => string

// Configuration for URL fields
export type UrlFieldConfig = {
  generateUrl?: GenerateURL // Optional function to generate the URL
} & BaseFieldConfig

// Configuration for permalink fields
export type PermalinkFieldConfig = BaseFieldConfig
