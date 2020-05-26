'use strict'
const Antl = use('Antl')

class UpdateProfile {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      birthday: 'date'
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = UpdateProfile
