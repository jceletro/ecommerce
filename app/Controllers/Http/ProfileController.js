'use strict'
const Profile = use('App/Models/Profile')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with customers
 */
class ProfileController {
  /**
   * Create/save a new customer.
   * POST customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const data = request.only(['cpf', 'rg', 'gender', 'tellphone', 'birthday'])
    const userId = auth.user.id
    const profileExists = await Profile.findBy('user_id', userId)
    if (profileExists) {
      return response
        .status(400)
        .send({ error: 'A profile already exists for this user' })
    }
    const profile = await Profile.create({ ...data, user_id: userId })
    await profile.load('user')

    return profile
  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ auth }) {
    const userId = auth.user.id
    const profile = await Profile.findBy('user_id', userId)
    // Create profile owner verification

    await profile.load('user')

    return profile
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, request }) {
    const userId = auth.user.id
    const profile = await Profile.findBy('user_id', userId)
    const data = request.only(['tellphone', 'gender', 'birthday'])

    profile.merge(data)

    await profile.save()

    await profile.load('user')

    return profile
  }
}

module.exports = ProfileController
