import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'businesses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name', 255).notNullable()
      table.string('description', 255).notNullable()
      table.string('user_id', 255).notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('category', 255).notNullable()
      table.json('images').nullable()
      table.integer('likes', 255).nullable()
      table.string('contact').notNullable()

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
