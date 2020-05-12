'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAddressSchema extends Schema {
  async up() {
    await this.db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    this.create('user_addresses', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'))
      table
        .uuid('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('name')
      table.string('street').notNullable()
      table.integer('number').notNullable().defaultTo(null)
      table.string('complement')
      table.string('district')
      table.string('postal_code').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.string('reference_point')
      table.timestamps()
    })
  }

  down() {
    this.drop('user_addresses')
  }
}

module.exports = UserAddressSchema
