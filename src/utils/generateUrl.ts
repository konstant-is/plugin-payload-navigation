import type { PluginContext } from './createPluginContext.js'

export const generateUrl = (context: PluginContext, data: Partial<any> | undefined) => {
  const { urlFieldConfig } = context.fieldConfigs
  // Generate URL if `generateUrl` function is provided
  const generatedUrl =
    typeof urlFieldConfig.generateUrl === 'function' ? urlFieldConfig.generateUrl(data) : ''

  // Handle nested docs logic
  if (context.nestedDocsEnabled && data) {
    const breadcrumbs = Array.isArray(data.breadcrumbs) ? data.breadcrumbs : []
    const nestedUrl = breadcrumbs.reverse()[0]?.url || ''
    return nestedUrl || generatedUrl
  }

  return generatedUrl
}
