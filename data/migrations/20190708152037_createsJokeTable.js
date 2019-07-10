exports.up = function(knex, Promise) {
  return knex.schema.createTable("jokes", tbl => {
    tbl.increments();

    tbl
      .string("joke", 255)
      .notNullable()
      .unique();

    tbl.string("punchline", 255).notNullable();

    tbl
      .boolean("public")
      .notNullable()
      .defaultTo(true);

    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("jokes");
};
