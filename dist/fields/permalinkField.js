import { getPluginPath } from '../utils/getPluginPath.js';
export const createPermalinkField = (config)=>{
    return {
        name: config.fieldName,
        type: 'ui',
        admin: {
            components: {
                Field: {
                    clientProps: {
                        custom: {
                            sourceField: config.sourceField
                        }
                    },
                    path: getPluginPath('client', '#PermalinkFieldClient')
                }
            }
        }
    };
};

//# sourceMappingURL=permalinkField.js.map