import Service from 'easy-requests'
import Config from 'src/config'

class User extends Service {
  constructor () {
    super()
    // this.config.origin = Env('BASE_URL')
    this.config.origin = Config('api.api_url')
    this.config.endpoint = '/users/'
  }

  static currentUser () {
    let UserService = new User()
    let response = UserService.http.get(Config('api.current_user_url'))
    return new Promise((resolve, reject) => {
      response
        .then(user => resolve(user.data))
        .catch(error => reject(error))
    })
  }
}

export default User
