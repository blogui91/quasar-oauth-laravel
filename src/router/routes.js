/*
* Using this package https://github.com/raniesantos/vue-routisan
* to beautify routes. For example
* {
*   path: '/',
*   component: () => import('layouts/default'),
*   children: [
*     { path: '', component: () => import('pages/index') }
*   ]
* }
*
*/
import { web, auth, guest } from 'src/router/middlewares'
import Route from 'vue-routisan'
// Define path where your views are stored
Route.setViewResolver(component => require('src/pages/' + component).default)

Route.view('/', 'layouts/default')
  .guard(web)
  .children(() => {
    Route.view('/', 'index').guard(auth)
  })

Route.view('/', 'layouts/default')
  .guard(web)
  .children(() => {
    Route.view('/login', 'login').name('app.login').guard(guest)
  })
Route.view('*', '404')

export default Route.all()
