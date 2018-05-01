import OAuth from 'src/oauth'
import Store from 'src/store'
const auth = new OAuth()
export default async function (to, from, next) {
  const user = auth.currentUser()

  user.then(user => {
    return Store.dispatch('users/setCurrentUser', user)
  }).then(result => {
    next()
  }).catch(error => {
    next()
    throw error
  })
}
