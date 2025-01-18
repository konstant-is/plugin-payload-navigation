/**
 * Hack to make 'slugify' import work with "type": "module".
 */
import s from 'slugify'

export const slugify = s.default || s
