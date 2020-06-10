const { test, trait, afterEach } = use('Test/Suite')('User Registration')
const Mail = use('Mail')
const User = use('App/Models/User')
trait('Test/ApiClient')

afterEach(async () => {
  await User.query().delete()
})

test('create a user', async ({ client, assert }) => {
  Mail.fake()

  const response = await client
    .post('users')
    .send({
      first_name: 'Kelvyn',
      last_name: 'Santana',
      email: 'email@email.com',
      password: '1234556',
      password_confirmation: '1234556'
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    first_name: 'Kelvyn',
    last_name: 'Santana',
    email: 'email@email.com'
  })

  const user = await User.findBy('email', 'email@email.com')

  assert.equal(user.toJSON().email, 'email@email.com')

  Mail.restore()
})

test('Not create a new user', async ({ client, assert }) => {
  Mail.fake()
  const response = await client.post('users').end()

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'The first_name is required.',
      field: 'first_name',
      validation: 'required'
    },
    {
      message: 'The last_name is required.',
      field: 'last_name',
      validation: 'required'
    },
    {
      message: 'The email is required.',
      field: 'email',
      validation: 'required'
    },
    {
      message: 'The password is required.',
      field: 'password',
      validation: 'required'
    }
  ])

  const user = await User.findBy('email', 'email@email.com')

  assert.isNull(user)
  Mail.restore()
})
