'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  // products() {
  //   return this.hasMany('App/Models/Product')
  // }

  image() {
    return this.belongsTo('App/Models/File', 'image_id', 'id')
  }
}

module.exports = Category
