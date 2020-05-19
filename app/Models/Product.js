'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  category() {
    return this.belongsTo('App/Models/Category', 'category_id', 'id')
  }

  image() {
    return this.belongsTo('App/Models/File', 'image_id', 'id')
  }
}

module.exports = Product
