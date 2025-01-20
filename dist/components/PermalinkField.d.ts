import type { ServerComponentProps, UIFieldClientProps } from 'payload';
type Props = {
    custom: {
        sourceField: string;
    };
} & ServerComponentProps & UIFieldClientProps;
export declare const PermalinkField: (props: Props) => import("react").JSX.Element;
export {};
