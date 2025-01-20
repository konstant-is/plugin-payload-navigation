import { createLocalizedSlugsField, createLocalizedUrlField, createPermalinkField, createSlugField, createUrlField } from '../fields/index.js';
import { createFieldConfigs } from './createFieldConfigs.js';
export const enhanceFields = ({ config, fields, locales })=>{
    let updatedFields = [
        ...fields
    ] // Start with a copy of the existing fields
    ;
    // Create index for fast lookups
    const indexedFields = fields.reduce((index, field)=>{
        if ('name' in field && typeof field.name === 'string') {
            index[field.name] = field;
        }
        return index;
    }, {});
    const addFields = (newFields)=>{
        newFields.forEach((field)=>{
            if ('name' in field && typeof field.name === 'string') {
                if (!indexedFields[field.name]) {
                    updatedFields.push(field);
                    indexedFields[field.name] = field;
                }
            } else {
                console.warn('Field without a name encountered. Skipping:', field);
            }
        });
    };
    // Generate configurations
    const { localizedSlugFieldConfig, localizedUrlFieldConfig, slugFieldConfig, urlFieldConfig } = createFieldConfigs(config, locales);
    // Add slug fields
    if (!indexedFields[slugFieldConfig.fieldName]) {
        const slugFields = createSlugField({
            config: slugFieldConfig
        });
        addFields(slugFields) // Handles multiple slug-related fields
        ;
    }
    // Add localized slug fields
    if (!indexedFields[localizedSlugFieldConfig.fieldName]) {
        const localizedField = createLocalizedSlugsField(localizedSlugFieldConfig);
        addFields([
            localizedField
        ]);
    }
    // Add URL fields
    if (!indexedFields[urlFieldConfig.fieldName]) {
        const field = createUrlField(urlFieldConfig);
        addFields([
            field
        ]);
    }
    // Add Localized URL field
    if (!indexedFields[localizedUrlFieldConfig.fieldName]) {
        const field = createLocalizedUrlField(localizedUrlFieldConfig);
        addFields([
            field
        ]);
    }
    if (config.options?.usePermalink && !indexedFields['permalink']) {
        const field = createPermalinkField({
            fieldName: 'permalink',
            sourceField: urlFieldConfig.fieldName
        });
        updatedFields = [
            field,
            ...updatedFields
        ];
    }
    return {
        configs: {
            localizedSlugFieldConfig,
            localizedUrlFieldConfig,
            slugFieldConfig,
            urlFieldConfig
        },
        fields: updatedFields
    };
};

//# sourceMappingURL=enhanceFields.js.map