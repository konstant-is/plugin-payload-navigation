import { generateUrl } from '../utils/generateUrl.js';
const validateUrlField = (context)=>({ data })=>{
        const url = generateUrl(context, data);
        return url;
    };
export const createUrlField = ({ context, fieldConfig })=>{
    return {
        name: fieldConfig.fieldName,
        type: 'text',
        admin: {
            description: 'Automatically generated url',
            position: 'sidebar',
            readOnly: true
        },
        defaultValue: '',
        hooks: {
            beforeValidate: [
                validateUrlField(context)
            ]
        },
        index: false,
        localized: true,
        required: true
    };
};

//# sourceMappingURL=urlField.js.map