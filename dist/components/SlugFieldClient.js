'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, FieldLabel, TextInput, useField, useForm, useFormFields } from '@payloadcms/ui';
import React, { useCallback, useMemo } from 'react';
import { cx } from '../utils/cx.js';
import { slugify } from '../utils/slugify.js';
import css from './SlugField.module.css';
export const SlugFieldClient = ({ custom, field, path, readOnly: readOnlyFromProps })=>{
    const { label } = field;
    const { checkboxFieldPath: checkboxFieldPathFromProps, slugifyOptions, watchFields } = custom;
    const checkboxFieldPath = path?.includes('.') ? `${path}.${checkboxFieldPathFromProps}` : checkboxFieldPathFromProps;
    const { setValue, value } = useField({
        path: path || field.name
    });
    const { dispatchFields } = useForm();
    // The value of the checkbox
    // We're using separate useFormFields to minimise re-renders
    const checkboxValue = useFormFields(([fields])=>{
        return fields[checkboxFieldPath]?.value;
    });
    const fields = useFormFields(([fields])=>{
        return watchFields.map((watch)=>fields[watch]);
    });
    const processedValue = useMemo(()=>{
        const separator = slugifyOptions?.replacement ?? '-';
        return fields.filter((item)=>Boolean(item?.value)).reduce((accumulator, currentValue, currentIndex)=>{
            return String(accumulator) + (currentIndex > 0 ? separator : '') + slugify(String(currentValue?.value), slugifyOptions);
        }, '');
    }, [
        fields,
        slugifyOptions
    ]);
    //   useEffect(() => {
    //     if (checkboxValue) {
    //       if (targetFieldValue) {
    //         const formattedSlug = formatSlug(targetFieldValue);
    //         if (value !== formattedSlug) setValue(formattedSlug);
    //       } else {
    //         if (value !== "") setValue("");
    //       }
    //     }
    //   }, [targetFieldValue, checkboxValue, setValue, value]);
    React.useEffect(()=>{
        if (processedValue !== value) {
            setValue(processedValue);
        }
    }, [
        setValue,
        processedValue,
        value
    ]);
    const handleLock = useCallback((e)=>{
        e.preventDefault();
        dispatchFields({
            type: 'UPDATE',
            path: checkboxFieldPath,
            value: !checkboxValue
        });
    }, [
        checkboxValue,
        checkboxFieldPath,
        dispatchFields
    ]);
    const readOnly = readOnlyFromProps || checkboxValue;
    return /*#__PURE__*/ _jsxs("div", {
        className: cx('field-type', css.ctr),
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: cx(css.label_wrapper),
                children: [
                    /*#__PURE__*/ _jsx(FieldLabel, {
                        htmlFor: `field-${path}`,
                        label: label
                    }),
                    /*#__PURE__*/ _jsx(Button, {
                        buttonStyle: "none",
                        className: cx(css.lock_button),
                        onClick: handleLock,
                        children: checkboxValue ? 'Unlock' : 'Lock'
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(TextInput, {
                onChange: setValue,
                path: path || field.name,
                readOnly: Boolean(readOnly),
                value: value
            })
        ]
    });
};

//# sourceMappingURL=SlugFieldClient.js.map