'use strict'
const Antl = use('Antl')

class User {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      first_name: 'required',
      last_name: 'required',
      email: 'required|email|unique:users,email',
      password: 'required|confirmed'
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = User
