/**
 * Hack to make 'slugify' import work with "type": "module".
 */
import s from 'slugify';
export declare const slugify: typeof s.default;
