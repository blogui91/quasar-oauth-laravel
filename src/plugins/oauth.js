import OAuth from 'src/app/oauth'

export default ({ app, router, Vue }) => {
  Vue.prototype.$oauth = new OAuth()
}
