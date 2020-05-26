'use strict'
const Antl = use('Antl')

class CreateProfile {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      cpf: 'required',
      rg: 'required',
      gender: 'required',
      tellphone: 'required',
      birthday: 'date'
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = CreateProfile
