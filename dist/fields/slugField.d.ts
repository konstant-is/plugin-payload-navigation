import type { CheckboxField, Field, FieldHook, TextField } from 'payload';
import type { SlugFieldConfig } from '../types.js';
type Props = {
    checkboxOverrides?: Partial<CheckboxField>;
    config: SlugFieldConfig;
    slugOverrides?: Partial<TextField>;
};
export declare const validateSlug: (config: SlugFieldConfig) => FieldHook;
export declare const createSlugField: (props: Props) => Field[];
export {};
