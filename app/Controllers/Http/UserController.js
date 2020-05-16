const Mail = use('Mail')

const User = use('App/Models/User')

class UserController {
  async store({ request }) {
    const data = request.only(['first_name', 'last_name', 'email', 'password'])

    const user = await User.create(data)
    await Mail.send(
      ['emails.create_account'],
      {
        email: user.email,
        name: user.first_name
      },
      (message) => {
        message
          .to(user.email)
          .from('tech@jccolchoes.com.br')
          .subject('Seja bem vindo!')
      }
    )

    return user
  }
}

module.exports = UserController
