export default {
  oauth: {
    grant_type: env('GRANT_TYPE', 'password'),
    client_id: env('CLIENT_ID', null),
    client_secret: env('CLIENT_SECRET', null),
    scope: '*'
  },
  default_storage: env('DEFAULT_STORAGE', 'LocalStorage'), // Supported Types 'Cookies', 'Localstorage',
  oauth_type: 'Bearer'
}
