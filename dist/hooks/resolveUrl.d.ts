import type { CollectionBeforeChangeHook } from 'payload';
import type { NavigationPluginConfig, UrlFieldConfig } from '../types.js';
export declare const resolveUrl: (pluginConfig: NavigationPluginConfig, config: UrlFieldConfig) => CollectionBeforeChangeHook;
