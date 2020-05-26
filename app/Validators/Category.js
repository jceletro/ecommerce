'use strict'
const Antl = use('Antl')

class Category {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      title: 'required'
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = Category
