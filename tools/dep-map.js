export const depMap = {
  // These must be provided by the consuming project
  peer: ['payload', '@payloadcms/plugin-nested-docs'],

  // These are bundled with your library and needed at runtime
  runtime: ['slugify'],
}
