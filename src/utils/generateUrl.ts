import type { UrlFieldConfig } from '../types.js'

export const generateUrl = (
  config: UrlFieldConfig,
  data: Partial<any> | undefined,
  useNestedDocs: boolean,
) => {
  // Generate URL if `generateUrl` function is provided
  const generatedUrl = typeof config.generateUrl === 'function' ? config.generateUrl(data) : ''

  // Handle nested docs logic
  if (useNestedDocs && data) {
    const breadcrumbs = Array.isArray(data.breadcrumbs) ? data.breadcrumbs : []
    const nestedUrl = breadcrumbs.reverse()[0]?.url || ''
    return nestedUrl || generatedUrl
  }

  return generatedUrl
}
