const createSlugFieldConfig = (config = {}, defaults)=>({
        fieldName: config.fieldName || defaults.fieldName,
        lockFieldName: config.lockFieldName || defaults.lockFieldName,
        useFields: config.useFields || [
            'title'
        ],
        slugify: {
            locale: 'en',
            lower: true,
            remove: /[*+~.()'"!:@]/g,
            replacement: '-',
            strict: false,
            trim: true,
            ...config.slugify || {}
        }
    });
const createLocalizedSlugFieldConfig = (config = {}, defaults)=>({
        fieldName: config.fieldName || defaults.fieldName,
        locales: config.locales || defaults.locales,
        sourceField: config.sourceField || defaults.sourceFieldName
    });
export const createUrlFieldConfig = (config = {}, defaults)=>({
        fieldName: config.fieldName || defaults.fieldName,
        generateUrl: config.generateUrl
    });
const createLocalizedUrlFieldConfig = (config = {}, defaults)=>({
        ...defaults,
        ...config || {}
    });
export const createFieldConfigs = (pluginConfig, locales)=>{
    const { fields = {} } = pluginConfig;
    const slugFieldConfig = createSlugFieldConfig(fields.slugField, {
        fieldName: 'slug',
        locales,
        lockFieldName: 'slugLock'
    });
    const localizedSlugFieldConfig = createLocalizedSlugFieldConfig(fields.localizedSlugField, {
        fieldName: 'slugs',
        locales,
        sourceFieldName: slugFieldConfig.fieldName
    });
    const urlFieldConfig = createUrlFieldConfig(fields.urlField, {
        fieldName: 'url'
    });
    const localizedUrlFieldConfig = createLocalizedUrlFieldConfig(fields.localizedUrlField, {
        fieldName: 'urls',
        locales,
        sourceField: urlFieldConfig.fieldName
    });
    return {
        localizedSlugFieldConfig,
        localizedUrlFieldConfig,
        slugFieldConfig,
        urlFieldConfig
    };
};

//# sourceMappingURL=createFieldConfigs.js.map