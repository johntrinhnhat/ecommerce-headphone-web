import {createClient} from 'next-sanity'

import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'tdf3mj40',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true,
  token: process.env.SANITY_PUBLIC_TOKENS,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
