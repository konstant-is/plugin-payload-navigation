import { PLUGIN_PATH } from '../constants.js'

type PathType = 'client' | 'rsc'

export const getPluginPath = (type: PathType, path: string): string => {
  return `${PLUGIN_PATH}/${type}${path}`
}
