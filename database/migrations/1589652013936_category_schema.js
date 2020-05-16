'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  async up() {
    await this.db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    this.create('categories', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'))
      table.string('title').notNullable()
      table.string('description')
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
    this.drop('categories')
  }
}

module.exports = CategorySchema
