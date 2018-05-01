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

import Route from 'vue-routisan'
// Define path where your views are stored
Route.setViewResolver(component => require('src/pages/' + component).default)

Route.view('/', 'layouts/default')
  .children(() => {
    Route.view('/', 'index')
  })

Route.view('/', 'layouts/default')
  .children(() => {
    Route.view('/login', 'login').name('app.login')
  })
Route.view('*', '404')

export default Route.all()
