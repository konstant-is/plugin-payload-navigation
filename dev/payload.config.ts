import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { navigationPlugin } from 'payload-plugin-navigation'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { devUser } from './helpers/credentials.js'
import { testEmailAdapter } from './helpers/testEmailAdapter.js'
import { seed } from './seed.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.ROOT_DIR) {
  process.env.ROOT_DIR = dirname
}

// eslint-disable-next-line no-restricted-exports
export default buildConfig({
  admin: {
    autoLogin: devUser,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    {
      slug: 'pages',
      admin: {
        defaultColumns: ['title', 'slug', 'url'],
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      slug: 'media',
      fields: [],
      upload: {
        staticDir: path.resolve(dirname, 'media'),
      },
    },
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://127.0.0.1/payload-plugin-navigation',
  }),
  editor: lexicalEditor(),
  email: testEmailAdapter,
  localization: {
    defaultLocale: 'en', // required
    locales: ['en', 'is'], // required
  },
  onInit: async (payload) => {
    await seed(payload)
  },

  plugins: [
    navigationPlugin({
      collections: ['pages'],
      fields: {
        slug: { autoIncrementSlug: true },
      },
      nestedDocsPlugin: {
        generateLabel: (_, doc) => doc.title as string,
        generateURL: (docs) => {
          return docs.reduce((url, doc) => {
            return `${url}/${doc.slug}`
          }, '')
        },
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || 'test-secret_key',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
