# Payload Plugin Navigation

The `payload-plugin-navigation` is a powerful and flexible plugin for [Payload CMS](https://payloadcms.com/) that enables easy creation and management of structured, localized, and SEO-friendly navigation structures. Designed for multilingual and complex websites, this plugin simplifies the handling of dynamic navigation elements.

## Features

- **Localized Navigation**  
  Build navigation menus tailored to multiple locales with seamless internationalization support.

- **Slug and URL Management**  
  Automatically generate and manage slugs and URLs with customizable options, including advanced slugify settings.

- **Nested Navigation Support**  
  Integrate with the [Nested Docs Plugin](https://github.com/payloadcms/plugin-nested-docs) for hierarchical navigation structures.

- **Permalink Generation**  
  Automatically resolve and display permalinks for referenced documents.

- **Flexible Configuration**

  - Append locales to URLs for all, none, or non-default locales.
  - Configure slug generation with regex support, lowercase transformation, replacement characters, and strict modes.

- **SEO Optimization**  
  Helps create clean, structured URLs to enhance search engine visibility.

## Installation

Install the plugin via npm:

```bash
npm install payload-plugin-navigation
```

## Basic Usage

```typescript
import { navigationPlugin } from 'payload-plugin-navigation'

import { buildConfig } from 'payload'

const config = buildConfig({
  collections: [
    {
      slug: 'pages',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
      ],
    },
  ],
  plugins: [
    navigationPlugin({
      collections: ['pages'],
      nestedDocsPlugin: {
        generateLabel: (_, doc) => doc.title,
        generateURL: (docs) => {
          return docs.reduce((url, doc) => `${url}/${doc.slug}`, '')
        },
      },
    }),
  ],
})

export default config
```

# Options

The `NavigationPlugin` provides a variety of configuration options to customize how navigation, slugs, and URLs are handled in your Payload CMS project. Below is a detailed breakdown of each field, including descriptions, available options, and default values.

---

## `appendLocaleToUrl`

Determines how locales are appended to generated URLs. This is useful for building multilingual navigation.

#### Available Options

- `'all'`: Append the locale to all URLs.
- `'exclude-default'`: Append the locale to all URLs except those for the default locale.
- `'none'`: Do not append the locale to any URLs.

#### Default Value

```typescript
appendLocaleToUrl: 'exclude-default'
```

## `fallbackLocale`

Specifies the locale to fall back on when no locale is explicitly provided. This is particularly useful for ensuring consistent behavior in multilingual setups when a specific locale is not available.

### Available Options

- Any valid locale string (e.g., `'en'`, `'fr'`, `'es'`).

#### Example

If the `fallbackLocale` is set to `'en'` and a request is made without a specific locale, the navigation or content will default to using the English locale.

#### Default Value

```typescript
fallbackLocale: 'en'
```

## `permalinkEnabled`

Enables or disables the generation of permalinks for collections

#### Available Options

- `true`: Enable permalink generation.
- `false`: Disable permalink generation

#### Default Value

```typescript
permalinkEnabled: true
```

## `nestedDocsPlugin`

The `nestedDocsPlugin` configuration enables support for hierarchical document structures, integrating with the [Nested Docs Plugin](https://github.com/payloadcms/plugin-nested-docs). This is useful for creating and managing nested navigation structures such as page hierarchies.

The `nestedDocsPlugin` configuration inherits all options from the [Nested Docs Plugin](https://payloadcms.com/docs/plugins/nested-docs#generateurl), except for the `collections` property, which is managed by the `Navigation Plugin`.

#### Configuration

The plugin does not enable nested document support by default. To use this feature, pass a configuration object for the `nestedDocsPlugin`.

- If `nestedDocsPlugin` is not provided, the plugin assumes that documents are flat and independent, without hierarchy.
- This feature is optional and can be omitted if nested navigation is not required.

#### Example Usage

```typescript
navigationPlugin({
  collections: ['pages'],
  nestedDocsPlugin: {
    generateLabel: (_, doc) => doc.title,
    generateURL: (breadcrumbs) =>
      breadcrumbs.reduce((url, breadcrumb) => `${url}/${breadcrumb.slug}`, ''),
  },
})
```

### `slugifyOptions`

#### Description

The `slugifyOptions` configuration allows you to customize the behavior of the slug generation process. These options are passed to the `slugify` utility to transform field values into SEO-friendly slugs.

#### Available Options

- **`locale`**: The locale to use for specific transformations (e.g., replacing certain characters).

  - **Type**: `string`
  - **Default**: `'en'`
  - **Example**: `'is'`

- **`lower`**: Converts the slug to lowercase.

  - **Type**: `boolean`
  - **Default**: `true`

- **`remove`**: A regular expression or string pattern to remove specific characters from the slug.

  - **Type**: `RegExp`
  - **Default**: `/[*+~.()'"!:@]/g`
  - **Example**: `/[^\w]/g` to remove all non-alphanumeric characters.

- **`replacement`**: The character used to replace spaces and other separators.

  - **Type**: `string`
  - **Default**: `'-'`

- **`strict`**: Ensures the slug only contains alphanumeric characters and separators.

  - **Type**: `boolean`
  - **Default**: `false`

- **`trim`**: Removes leading and trailing separators from the slug.
  - **Type**: `boolean`
  - **Default**: `true`

#### Default Configuration

```typescript
{
  locale: 'en',
  lower: true,
  remove: /[*+~.()'"!:@]/g,
  replacement: '-',
  strict: false,
  trim: true,
}
```

## `fields`

The `fields` configuration allows you to define the behavior and properties of fields added by the plugin. These fields handle slugs, URLs, and other navigation-related properties.

### Available Fields

#### `slug`

- **Description**: The `slug` field stores a URL-friendly string derived from other fields, typically the `title`.
- **Options**:
  - `fieldName` (string): Name of the field where the slug is stored.
  - `lockFieldName` (string): Name of the field to lock the slug from further updates.
  - `useFields` (string[]): Array of field names to use for generating the slug.
- **Default Configuration**:
  ```typescript
  slug: {
    fieldName: 'slug',
    lockFieldName: 'slugLock',
    useFields: ['title'],
  }
  ```

````

```

```
````
