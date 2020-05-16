'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('files', 'FileController.store')
Route.get('files/:id', 'FileController.show')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')
Route.post('users/profiles/email', 'AlterEmailController.store').middleware([
  'auth'
])
Route.put('users/profiles/email', 'AlterEmailController.update').middleware(
  'auth'
)
/** User Profile */
Route.post('users/profiles', 'ProfileController.store').middleware(['auth'])
Route.put('users/profiles', 'ProfileController.update').middleware(['auth'])
Route.get('users/profiles', 'ProfileController.show').middleware(['auth'])

/** User Address */

Route.post('users/addresses', 'UserAddressController.store').middleware([
  'auth'
])
/** Category */

Route.post('categories', 'CategoryController.store').middleware([
  'auth',
  'admin'
])
