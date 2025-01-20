export const createUrlField = (config)=>{
    return {
        name: config.fieldName,
        type: 'text',
        admin: {
            position: 'sidebar',
            readOnly: true
        },
        defaultValue: '',
        index: false,
        localized: true,
        required: true
    };
};

//# sourceMappingURL=urlField.js.map