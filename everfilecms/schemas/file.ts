import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'files',
  title: 'Files',
  type: 'document',
  fields: [
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
    }),
  ],
})
