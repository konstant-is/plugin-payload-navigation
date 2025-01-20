import type { Field } from 'payload';
import type { NavigationPluginConfig } from '../types.js';
export declare const enhanceFields: ({ config, fields, locales, }: {
    config: NavigationPluginConfig;
    fields: Field[];
    locales: string[];
}) => {
    configs: {
        localizedSlugFieldConfig: {
            locales: string[];
        } & {
            fieldName: string;
            sourceField?: string;
        };
        localizedUrlFieldConfig: {
            locales: string[];
        } & {
            fieldName: string;
            sourceField?: string;
        };
        slugFieldConfig: import("../types.js").SlugFieldConfig;
        urlFieldConfig: import("../types.js").UrlFieldConfig;
    };
    fields: Field[];
};
