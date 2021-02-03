const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Recipe = require("./recipe-model");

//Post new Recipe
// router.post("/", (req, res) => {
//   Recipe.add(req.body)
//     .then((recipe) => {
//       if (recipe.recipe_private == 0) {
//         recipe.recipe_private = false;
//       } else if (recipe.recipe_private == 1) {
//         recipe.recipe_private = true;
//       }
//       res.status(201).json(recipe);
//     })
//     .catch((err) => {
//       res.status(500).json(err.message);
//     });
// });
router.post("/", (req, res) => {
  Recipe.add(req.body)
    .then((newRecipe) => {
      res.status(201).json(newRecipe);
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
});

// Get all Recipes
router.get("/", (req, res) => {
  Recipe.getRecipes(id)
    .then((recipes) => {
      if (recipes) {
        res.json(recipes);
      } else {
        res.status(401).json({ message: "No recipes created" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: error.message });
    });
});

// Get Recipe by Id
router.get("/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Add Ingredient for Recipe item
router.post("/:id/shoppingList", (req, res) => {
  const { id } = req.params;

  Recipe.addToShoppingList(req.body)
    .then((ingredients) => {
      if (ingredients.length) {
        res.status(200).json(ingredients);
      } else {
        res.status(404).json({ message: "Add ingredient" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get Ingredients for Recipe Item
router.get("/:id/shoppingList", async (req, res) => {
  Recipe.getShoppingList(id)
    .then((ingredients) => {
      if (ingredients.length) {
        res.status(201).json(ingredients);
      } else {
        res
          .status(404)
          .json({ message: "Could not find ingredients for given recipe" });
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// addInstructions
router.post("/:id/instructions", (req, res) => {
  const { id } = req.params;

  Recipe.addToInstructions(req.body)
    .then((step) => {
      res.status(200).json(step);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// getInstructions
router.get("/:id/instructions", (req, res) => {
  const { id } = req.params;

  Recipe.getInstructions(id)
    .then((instructions) => {
      if (instructions.length) {
        res.json(instructions);
      } else {
        res
          .status(404)
          .json({ message: "Could not find instrutions for given recipe " });
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

//editRecipe

router.put("/:id", (req, res) => {
  Recipe.edit(req.params.id, req.body)
    .then((editedRecipe) => {
      res.status(200).json(editedRecipe);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//deleteRecipe
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Recipe.remove(id)
    .then(() => {
      res.status(200).json({ message: `Recipe ${id} has been removed` });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//Find by category
router.post("/category", (req, res) => {
  const { category } = req.body;

  Recipe.findBy({ category: category })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
