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
Route.post('users/email', 'AlterEmailController.store')
Route.put('users/email', 'AlterEmailController.update')

Route.post('profiles', 'ProfileController.store').middleware(['auth'])
Route.put('profiles', 'ProfileController.update').middleware(['auth'])
Route.get('profiles', 'ProfileController.show').middleware(['auth'])
