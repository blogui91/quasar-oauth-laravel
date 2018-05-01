import OAuth from 'src/oauth'
const auth = new OAuth()
export default async function (to, from, next) {
  try {
    const user = await auth.currentUser()
    if (user) {
      next()
    } else {
      next('/login')
    }
  } catch (error) {
    console.log(error)
    next()
  }
}
