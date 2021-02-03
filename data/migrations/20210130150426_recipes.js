exports.up = function (knex) {
  return knex.schema.createTable("recipes", (table) => {
    table.increments("recipe_id");
    table.string("recipe_name", 128).notNullable();
    table.string("author", 128).notNullable();
    table.string("category", 128).notNullable();
    table.string("time", 128).notNullable();
    table.boolean("recipe_private").notNullable().defaultTo(false);
    table.string("ingredients").notNullable();
    table.string("steps").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("recipes");
};
