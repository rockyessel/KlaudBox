import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
  projectId: 'ut3w84xx',
  dataset: 'production',
  useCdn: true, // set to `true` to fetch from edge cache
  apiVersion: '2023-02-17', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN,
};
export const Client = createClient(config);

