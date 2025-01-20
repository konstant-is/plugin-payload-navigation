export const createLocalizedUrlField = (config)=>{
    return {
        name: config.fieldName,
        type: 'group',
        admin: {
            description: 'Automatically generated localized urls.',
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
    };
};

//# sourceMappingURL=localizedUrlField.js.map