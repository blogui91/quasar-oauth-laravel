import Http from 'axios'
import { Config } from 'helpers'
export default {
  async attemptLogin (credentials) {
    try {
      let response = await Http.post(Config('api.token_url'), credentials)
      return new Promise(resolve => resolve(response))
    } catch (error) {
      return new Promise((resolve, reject) => reject(error))
    }
  },
  currentUser () {
    const currentUser = Http.get(Config('api.current_user_url'))
    return new Promise((resolve, reject) => {
      currentUser
        .then(user => resolve(user.data))
        .catch(error => reject(error))
    })
  }
}
