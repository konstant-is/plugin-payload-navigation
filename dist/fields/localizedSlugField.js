export const createLocalizedSlugsField = ({ context, fieldConfig })=>({
        name: fieldConfig.fieldName,
        type: 'group',
        admin: {
            description: 'Automatically generated localized slugs.',
            readOnly: true
        },
        fields: context.locales.map((locale)=>({
                name: locale,
                type: 'text',
                defaultValue: '',
                localized: false
            })),
        localized: false
    });

//# sourceMappingURL=localizedSlugField.js.map