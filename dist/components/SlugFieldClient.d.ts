import type { TextFieldClientProps } from 'payload';
import React from 'react';
import type { SlugifyOptions } from '../types.js';
type Props = {
    custom: {
        checkboxFieldPath: string;
        slugifyOptions: SlugifyOptions;
        watchFields: string[];
    };
} & TextFieldClientProps;
export declare const SlugFieldClient: React.FC<Props>;
export {};
