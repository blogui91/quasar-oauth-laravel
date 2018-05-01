import OAuth from 'src/oauth'
import Services from 'src/services'

export default ({ app, router, Vue }) => {
  const oauth = new OAuth()
  Vue.prototype.$oauth = oauth
  Services.run({
    oauth
  })
}
