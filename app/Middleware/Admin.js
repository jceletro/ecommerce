'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Admin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    try {
      const user = await auth.getUser()

      if (!user.roles || user.roles !== 'admin')
        throw new Error('This action require admin previleges')

      await next()
    } catch (err) {
      return response.status(401).send({ message: err.message })
    }
  }
}

module.exports = Admin
