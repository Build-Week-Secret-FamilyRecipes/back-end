const db = require("../../data/dbConfig");

module.exports = {
  add(recipe) {
    return db("recipes").insert(recipe, "id");
  },

  getRecipes() {
    return db("recipes");
  },

  getShoppingList(id) {
    return db("ingredients as i")
      .join("step_ingredients as si", "i.ingredient_id", "si.ingredient_id")
      .join("steps as s", "si.step_id", "s.step_id")
      .select("i.ingredient_name", "si.ingredient_quantity")
      .where("s.recipe_id", id);
  },

  async addToShoppingList(ingredient) {
    const [id] = await db("ingredients as i")
      .join("step_ingredients as si", "i.ingredient_id", "si.ingredient_id")
      .join("steps as s", "si.step_id", "s.step_id")
      .select("i.ingredient_name", "si.ingredient_quantity")
      .where("s.recipe_id", id)
      .insert(ingredient)
      .then(([id]) => {
        return db("ingredients").where("id", id).first();
      });
  },

  getInstructions(id) {
    return db("steps")
      .select("step_text", "step_order")
      .where("recipe_id", id)
      .orderBy("step_order");
  },

  async addToInstructions(step) {
    const [id] = await db("steps")
      .select("step_text", "step_order")
      .where("recipe_id", id)
      .orderBy("step_order")
      .insert(step)
      .then(([id]) => {
        return db("steps").where("id", id).first();
      });
  },

  remove(id) {
    return db("recipes").where({ id }).del();
  },

  edit(id, changes) {
    return db("recipes").where({ id }).update(changes);
  },

  findById(id) {
    return db("recipes").where({ id }).first;
  },

  findBy(filter) {
    return db("recipes").where(filter).orderBy("id");
  },
};
