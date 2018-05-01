import OAuth from 'src/oauth'

export default ({ app, router, Vue }) => {
  Vue.prototype.$oauth = new OAuth()
}
