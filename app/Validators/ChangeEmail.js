'use strict'
const Antl = use('Antl')

class ChangeEmail {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      email: 'required|email|confirmed',
      token: 'required'
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = ChangeEmail
