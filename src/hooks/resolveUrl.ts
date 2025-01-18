import type { CollectionBeforeChangeHook } from 'payload'

import type { AppendLocaleToUrlOptions, NavigationPluginConfig, UrlFieldConfig } from '../types.js'

import { DEFAULT_LOCALE } from '../constants.js'

export const resolveUrl =
  (pluginConfig: NavigationPluginConfig, config: UrlFieldConfig): CollectionBeforeChangeHook =>
  ({ data, req }) => {
    const { locale, payload } = req
    const { defaultLocale = DEFAULT_LOCALE } = payload.config.localization || {}
    const currentLocale = locale || defaultLocale || 'en'
    const useNestedDocs = pluginConfig.nestedDocsPlugin !== undefined

    // Generate the base URL
    const baseUrl = generateUrl(config, data, useNestedDocs)

    // Resolve the final URL by appending locale if needed
    const resolvedUrl = resolveFinalUrl({
      appendTo: pluginConfig.options?.appendLocaleToUrl,
      baseUrl,
      defaultLocale,
      locale: currentLocale,
    })

    return {
      ...data,
      [config.fieldName]: resolvedUrl,
    }
  }

const generateUrl = (config: UrlFieldConfig, data: Partial<any>, useNestedDocs: boolean) => {
  // Generate URL if `generateUrl` function is provided
  const generatedUrl = typeof config.generateUrl === 'function' ? config.generateUrl(data) : ''

  // Handle nested docs logic
  if (useNestedDocs) {
    const breadcrumbs = Array.isArray(data.breadcrumbs) ? data.breadcrumbs : []
    const nestedUrl = breadcrumbs.reverse()[0]?.url || ''
    return nestedUrl || generatedUrl
  }

  return generatedUrl
}

const resolveFinalUrl = ({
  appendTo = 'none',
  baseUrl,
  defaultLocale,
  locale,
}: {
  appendTo: AppendLocaleToUrlOptions | undefined
  baseUrl: string
  defaultLocale: string
  locale: string
}): string => {
  switch (appendTo) {
    case 'all':
      return `/${locale}${baseUrl}`
    case 'exclude-default':
      return locale === defaultLocale ? baseUrl : `/${locale}${baseUrl}`
    default:
      return baseUrl
  }
}
