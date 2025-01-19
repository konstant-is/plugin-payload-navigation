/**
 * Hack to make 'slugify' import work with "type": "module".
 */
import s from 'slugify'

import type { SlugifyOptions } from '../types.js'

import { defaultValues } from '../constants.js'

// Fallback for CommonJS or ESM default export
export const slugify = s.default || s

type SlugifyOptionsWithRemove = {
  remove?: RegExp | string
} & Omit<SlugifyOptions, 'remove'>

/**
 * Convert a string representation of a RegExp (e.g., `/pattern/flags`) into a RegExp object.
 */
const stringToRegex = (regexString: string): RegExp => {
  const pattern = regexString.replace(/^\/|\/[gimsuy]*$/g, '') // Strip leading/trailing slashes and flags
  const flags = regexString.match(/\/([gimsuy]*)$/)?.[1] || '' // Extract flags (if any)
  return new RegExp(pattern, flags)
}

/**
 * Merge user-provided slugify options with defaults.
 */
const getOptions = (opts: SlugifyOptionsWithRemove): Required<SlugifyOptions> => {
  const remove = typeof opts.remove === 'string' ? stringToRegex(opts.remove) : opts.remove

  return {
    ...defaultValues.slugify,
    ...opts,
    remove: remove || defaultValues.slugify.remove,
  }
}

/**
 * Generate a slug from an array of fields.
 * @param fields - The fields to generate the slug from.
 * @param slugifyOptions - Options for customizing slug generation.
 * @returns The generated slug.
 */
export const generateSlug = (
  fields: Array<{ value?: unknown } | null | string | undefined>,
  slugifyOptions: SlugifyOptionsWithRemove,
): string => {
  const options = getOptions(slugifyOptions)

  return fields
    .filter((item) => Boolean(item && (typeof item === 'string' || item?.value))) // Filter null/undefined
    .map((item) => slugify(typeof item === 'string' ? item : String(item?.value), options))
    .join(options.replacement) // Join the slugified parts
}
