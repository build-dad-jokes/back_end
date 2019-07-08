exports.up = function(knex, Promise) {
    return knex.shema.createTable("jokes", tbl => {
        tbl.increments();
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("jokes");
};