import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'contacts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('user_id', 255).notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('phone', 255).notNullable()
      table.string('email', 255).notNullable()
      table.string('address', 255).notNullable()
      table.string('website', 255).notNullable()
      table.string('facebook', 255).notNullable()
      table.string('twitter', 255).notNullable()
      table.string('linkedin', 255).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
