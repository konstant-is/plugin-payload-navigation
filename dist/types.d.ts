import type { NestedDocsPluginConfig } from '@payloadcms/plugin-nested-docs/types';
import type { CollectionSlug } from 'payload';
export type AppendLocaleToUrlOptions = 'all' | 'exclude-default' | 'none';
export type NavigationPluginConfig = {
    /**
     * Collections this plugin should extend. If you need different configs for different collections, this plugin can be added to your config more than once with different collections.
     */
    collections: CollectionSlug[];
    disabled?: boolean;
    /**
     * Configuration for slug and URL fields.
     */
    fields?: {
        localizedSlugField?: Partial<LocalizedSlugFieldConfig>;
        localizedUrlField?: Partial<LocalizedUrlFieldConfig>;
        slugField?: Omit<Partial<SlugFieldConfig>, 'slugify'>;
        urlField?: Partial<UrlFieldConfig>;
    };
    /**
     * Configuration for nested document support.
     */
    nestedDocsPlugin?: Omit<NestedDocsPluginConfig, 'collections'>;
    /**
     * Options for handling URL generation.
     */
    options?: {
        appendLocaleToUrl?: AppendLocaleToUrlOptions;
        slugify?: SlugifyOptions;
        usePermalink?: boolean;
    };
};
type BaseFieldConfig = {
    fieldName: string;
    sourceField?: string;
};
type LocalizedFieldConfig = {
    locales: string[];
} & BaseFieldConfig;
export type SlugifyOptions = {
    locale?: string;
    lower?: boolean;
    remove?: RegExp;
    replacement?: string;
    strict?: boolean;
    trim?: boolean;
};
export type LocalizedSlugFieldConfig = LocalizedFieldConfig;
export type LocalizedUrlFieldConfig = LocalizedFieldConfig;
export type SlugFieldConfig = {
    lockFieldName: string;
    slugify: SlugifyOptions;
    useFields: string[];
} & BaseFieldConfig;
type GenerateURL = (data: Record<string, unknown>) => string;
export type UrlFieldConfig = {
    generateUrl?: GenerateURL;
} & BaseFieldConfig;
export type PermalinkFieldConfig = BaseFieldConfig;
export {};
