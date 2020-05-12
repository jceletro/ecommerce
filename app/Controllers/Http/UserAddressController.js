'use strict'

const UserAddress = use('App/Models/UserAddress')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with useraddresses
 */
class UserAddressController {
  async store({ request, auth }) {
    const data = request.only([
      'name',
      'street',
      'number',
      'complement',
      'district',
      'postal_code',
      'city',
      'state',
      'reference_point'
    ])

    const userId = auth.user.id

    const userAddress = await UserAddress.create({ ...data, user_id: userId })

    return userAddress
  }
}

module.exports = UserAddressController
