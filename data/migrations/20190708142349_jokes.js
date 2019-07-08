exports.up = function(knex, Promise) {
    return knex.shema.createTable("jokes", tbl => {
        tbl.increments();
        tbl
          .string('joke', 128)
          .notNullable()
          .unique();
        tbl.string('answer', 128).notNullable();
    });
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("jokes");
};