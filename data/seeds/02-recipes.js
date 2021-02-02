exports.seed = function (knex) {
  return knex("recipes")
    .truncate()
    .then(function () {
      return knex("recipes").insert([
        {
          recipe_name: "Pasta",
          author: "Matt",
          category: "Dinner",
          time: "1hr",
          recipe_private: false,
          ingredients:
            "1. Pasta \n 2. Shredded Cheese \n 3. Your favorite tomato sauce",
          steps:
            "1. Boil pasta in pot \n 2. Once done boiling drain pasta and heat up sauce on top of pasta \n 3. Take pasta and sauce off of burner, put in bowl and serve. \n 4. Use cheese as needed. ",
        },
      ]);
    });
};
