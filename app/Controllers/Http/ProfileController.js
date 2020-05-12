'use strict'
const Mail = use('Mail')
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
    const data = request.only([
      'first_name',
      'last_name',
      'cpf',
      'rg',
      'gender',
      'tellphone',
      'birthday'
    ])
    const userId = auth.user.id
    const profileExists = await Profile.findBy('user_id', userId)
    if (profileExists) {
      return response
        .status(400)
        .send({ error: 'A profile already exists for this user' })
    }

    const profile = await Profile.create({ ...data, user_id: userId })
    await profile.load('user')

    await Mail.send(
      ['emails.create_account'],
      {
        email: auth.user.email,
        name: profile.first_name
      },
      (message) => {
        message
          .to(auth.user.email)
          .from('tech@jccolchoes.com.br')
          .subject('Seja bem vindo!')
      }
    )

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
  async update({ auth, request, response }) {
    const userId = auth.user.id
    const profile = await Profile.findBy('user_id', userId)
    console.log(profile)
    const data = request.only(['tellphone', 'gender', 'birthday'])

    profile.merge(data)

    await profile.save()

    await profile.load('user')

    return profile
  }
}

module.exports = ProfileController
