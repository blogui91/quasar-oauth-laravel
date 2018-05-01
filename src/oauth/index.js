/***************************************************
 * [Quasar Cookies] http://quasar-framework.org/components/cookies.html
 * [Quasar LocalStorage] http://quasar-framework.org/components/web-storage.html
 **************************************************/

import { Cookies, LocalStorage } from 'quasar'
import HttpService from './auth.service'
import { Config } from 'helpers'
import Store from 'src/store'
class OAuth {
  constructor () {
    this.storages = {
      Cookies,
      LocalStorage
    }
    this.session = this.storages[Config('auth.default_storage')]
  }

  logout () {
    this.session.remove('access_token')
    this.session.remove('refresh_token')
    Store.dispatch('users/destroyCurrentUser')
  }

  guest () {
    return !this.session.has('access_token')
  }

  isAuthenticated () {
    return this.session.has('access_token')
  }

  login (username, password) {
    let data = {
      username,
      password
    }

    // We merge grant type and client secret stored in configuration
    Object.assign(data, Config('auth.oauth'))
    return new Promise((resolve, reject) => {
      HttpService.attemptLogin(data)
        .then(response => {
          this.storeSession(response.data)
          resolve(response)
        })
        .catch(error => {
          console.log('OAUTH Authentication error: ', error)
          reject(error)
        })
    })
  }

  currentUser () {
    if (this.session.has('access_token')) {
      return new Promise((resolve, reject) => {
        HttpService.currentUser()
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            if (error.response && (error.response.status === 401 || error.response.status === 429)) {
              this.logout()
            }
            reject(error)
          })
      })
    }
    return new Promise(resolve => resolve(null))
  }

  getAuthHeader () {
    if (this.session.has('access_token')) {
      let access_token = this.getItem('access_token')
      return Config('auth.oauth_type') + ' ' + access_token
    }
    return null
  }

  getItem (key) {
    if (Config('auth.default_storage') === 'LocalStorage') {
      return this.session.get.item(key)
    }
    return this.session.get(key)
  }

  storeSession (data) {
    let hourInMilliSeconds = 86400
    let time = data.expires_in / hourInMilliSeconds

    if (Config('auth.default_storage') === 'LocalStorage') {
      this.session.set('access_token', data.access_token)
      this.session.set('refresh_token', data.access_token)
    } else {
      /*
      **  when the Storage is type Cookies
      **  we send the expires property given in days
      */
      this.session.set('access_token', data.access_token, {
        expires: time
      })
      /*
       ** We duplicate the time because,
       ** in theory it lasts the double of time access token duration
       */
      this.session.set('refresh_token', data.access_token, {
        expires: time * 2
      })
    }
  }
}

export default OAuth
