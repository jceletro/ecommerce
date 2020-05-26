'use strict'
const Antl = use('Antl')

class CreateAddress {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      street: 'required',
      number: 'required',
      postal_code: 'required',
      city: 'required',
      state: 'required'
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = CreateAddress
