'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  async up() {
    await this.db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    this.create('products', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'))
      table.string('title').notNullable()
      table.string('description')
      table.decimal('price', 8, 2).notNullable()
      table
        .uuid('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table
        .uuid('image_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('products')
  }
}

module.exports = ProductSchema
