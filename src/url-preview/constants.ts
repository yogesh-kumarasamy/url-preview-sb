export const URL_PREVIEW_CONSTANTS = {
  STAGING_URL: 'https://api-dot-staging-fullspectrum.appspot.com/api/v2/util/url/meta',
  LIVE_URL: 'https://api.anywhereworks.com/api/v2/util/url/meta',
};

const environment = {
  staging: URL_PREVIEW_CONSTANTS.STAGING_URL,
  live: URL_PREVIEW_CONSTANTS.LIVE_URL,
};

export const getMetaDataEndpoint = (env: 'staging' | 'live'): string => environment[env];
