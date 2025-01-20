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

## `slugifyOptions`

The `slugifyOptions` setting allows you to define how slugs are generated from input text. These options include customizing character replacements, case sensitivity, and trimming behavior. The configuration leverages the capabilities of the [slugify](https://www.npmjs.com/package/slugify) package to ensure clean, SEO-friendly slugs.

#### Default Configuration

```typescript
{
  locale: 'en',
  lower: true, // Converts text to lowercase
  remove: /[*+~.()'"!:@]/g, // Removes specified characters
  replacement: '-', // Replaces spaces and removed characters with this value
  strict: false, // If true, removes non-alphanumeric characters
  trim: true, // Trims leading and trailing separator characters
}
```

## `fields`

The `fields` configuration allows you to define the behavior and properties of fields added by the plugin. These fields handle slugs, URLs, and other navigation-related properties.

#### `slug`

The `slug` field stores a URL-friendly string derived from other fields, typically the `title`.

| Field         | Type     | Default    | Description                                              |
| ------------- | -------- | ---------- | -------------------------------------------------------- |
| fieldName     | string   | "slug"     | Name of the field where the slug is stored.              |
| lockFieldName | string   | "slugLock" | Name of the field to lock the slug from further updates. |
| useFields     | string[] | ["title"]  | Array of field names to use for generating the slug.     |

<!-- ### `url`

The url field stores the generated URL for the document. It is often derived from the slug and can optionally include locale prefixes.

#### Options

- `fieldName` (string): The name of the field where the URL is stored.
- `sourceField` (string): Field name to use for generating the slug.
- `generateUrl` (function): A function that generates a custom URL based on the document data.

#### Default Configuration

```typescript
url: {
  fieldName: 'url',
  sourceField: 'slug'
  generateUrl: undefined
}
```

### `localizedSlug`

### `localizedUrl` -->
