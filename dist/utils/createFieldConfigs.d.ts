import type { NavigationPluginConfig, SlugFieldConfig, UrlFieldConfig } from '../types.js';
export declare const createUrlFieldConfig: (config: Partial<UrlFieldConfig> | undefined, defaults: UrlFieldConfig) => UrlFieldConfig;
export declare const createFieldConfigs: (pluginConfig: NavigationPluginConfig, locales: string[]) => {
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
    slugFieldConfig: SlugFieldConfig;
    urlFieldConfig: UrlFieldConfig;
};
