'use strict'
const crypto = require('crypto')
const Mail = use('Mail')
const moment = require('moment')
const User = use('App/Models/User')

class AlterEmailController {
  async store({ request, response }) {
    try {
      const { email } = request.all()
      const user = await User.findByOrFail('email', email)
      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.alter_email'],
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        (message) => {
          message
            .to(user.email)
            .from('tech@jccolchoes.com.br')
            .subject('Solicitação para alterar o e-mail')
        }
      )
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Algo não deu certo, esse e-mail existe ?'
        }
      })
    }
  }

  async update({ request, response }) {
    try {
      const { email, token } = request.all()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment()
        .subtract('2', 'hours')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'Token expired' } })
      }

      user.email = email
      user.token = null
      user.token_created_at = null

      await user.save()
    } catch (err) {
      return response
        .status(400)
        .send({ error: { message: 'Ocorreu um erro ao alterar seu e-mail' } })
    }
  }
}

module.exports = AlterEmailController
