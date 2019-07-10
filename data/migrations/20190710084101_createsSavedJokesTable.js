exports.up = function(knex, Promise) {
  return knex.schema.createTable("savedJokes", tbl => {
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .integer("joke_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("jokes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("savedJokes");
};
