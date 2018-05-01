import http from 'axios'
export default {
  run (session) {
    const { oauth } = session
    http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

    // Add a request interceptor
    http.interceptors.request.use(
      function (config) {
        // Handle requests here
        config.headers['Authorization'] = oauth.getAuthHeader()
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    http.interceptors.response.use(
      function (response) {
        // Do something with response data
        return response
      },
      function (error) {
        // Do something with response error
        if (error.response && error.response.status === 401) {
          oauth.logout()
        }
        return Promise.reject(error)
      }
    )
  }
}
