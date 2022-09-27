import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "institutions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();
      table.string("name", 255).notNullable();
      table.string("description", 255).notNullable();
      table.string("image", 255).notNullable();
      table
        .uuid("contact_id")
        .notNullable()
        .references("id")
        .inTable("contacts");
      table.json("admins").notNullable();
      table.json("members").nullable();
      table.json("requests").nullable();
      table.json("posts").nullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
