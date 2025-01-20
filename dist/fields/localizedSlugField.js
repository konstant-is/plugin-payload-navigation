export const createLocalizedSlugsField = (config)=>({
        name: config.fieldName,
        type: 'group',
        admin: {
            description: 'Automatically generated localized slugs.',
            readOnly: true
        },
        fields: config.locales.map((locale)=>({
                name: locale,
                type: 'text',
                defaultValue: '',
                localized: false,
                required: true
            })),
        localized: false
    });

//# sourceMappingURL=localizedSlugField.js.map