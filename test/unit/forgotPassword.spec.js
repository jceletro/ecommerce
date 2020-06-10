const { test, trait } = use('Test/Suite')('Forgot Password')
const Mail = use('Mail')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Create a reset password request', async ({ client }) => {
  Mail.fake()
  const user = await Factory.model('App/Models/User').create()
  const response = await client
    .post('passwords')
    .send({
      email: user.email,
      redirect_url: 'http://www.seinao.com'
    })
    .end()
  /**
   * [ ] Verificar se o token foi criado na tabela
   */

  response.assertStatus(204)

  Mail.restore()
})
