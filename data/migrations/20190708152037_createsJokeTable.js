exports.up = function(knex) {
  return knex.schema.createTable("jokes", tbl => {
    tbl.increments();

    tbl
      .string("joke", 255)
      .notNullable()
      .unique();
    tbl
      .integer("user_id")
      .unsigned()
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
