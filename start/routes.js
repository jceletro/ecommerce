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

Route.get('/', () => {
  return { 
    title: 'E-commerce Adonis',
    version: '0.0.1'
   }
})

/** Users */
Route.post('users', 'UserController.store').validator('User')
/** Sessions */
Route.post('sessions', 'SessionController.store').validator('Session')
/** Files */
Route.post('files', 'FileController.store').middleware(['auth'])
Route.get('files/:id', 'FileController.show')

Route.post('passwords', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('passwords', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)
Route.post('users/profiles/email', 'AlterEmailController.store')
  .middleware(['auth'])
Route.put('users/profiles/email', 'AlterEmailController.update')
  .middleware('auth')
/** User Profile */
Route.post('users/profiles', 'ProfileController.store')
  .middleware(['auth'])
Route.put('users/profiles', 'ProfileController.update')
  .middleware(['auth'])
Route.get('users/profiles', 'ProfileController.show').middleware(['auth'])

/** User Address */

Route.post('users/addresses', 'UserAddressController.store')
  .middleware(['auth'])

/** Category */
Route.post('categories', 'CategoryController.store')
  .middleware(['auth', 'admin'])
Route.put('categories/:id', 'CategoryController.update').middleware([
  'auth',
  'admin'
])

Route.delete('categories/:id', 'CategoryController.destroy').middleware([
  'auth',
  'admin'
])
Route.get('categories/:id', 'CategoryController.show')
Route.get('categories', 'CategoryController.index')

/** Product */
Route.get('products', 'ProductController.index')
Route.get('products/:id', 'ProductController.show')
Route.put('products/:id', 'ProductController.update').middleware([
  'auth',
  'admin'
])
Route.post('products', 'ProductController.store')
  .middleware(['auth', 'admin'])
Route.delete('products/:id', 'ProductController.destroy').middleware([
  'auth',
  'admin'
])
