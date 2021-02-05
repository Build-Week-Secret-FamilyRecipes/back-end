const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const Recipe = require("./recipe-model");

// Post recipe
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
  Recipe.getRecipes(req.body)
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
  Recipe.findById(req.params.recipe_id)
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
  const recipe = Recipe.findBy((r) => r.id === parseInt(req.params.recipe_id));
  if (!recipe) res.status(404).send("The course with the given id was missing");

  const { error } = validateRecipe(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  recipe.body = req.body;
  res.send(recipe);
});

function validateRecipe(recipe) {
  const schema = {
    name: Joi.string().min(1).required(),
  };
  return Joi.validate(recipe, schema);
}
//deleteRecipe
router.delete("/:id", (req, res) => {
  const { recipe_id } = req.params;
  Recipe.remove(recipe_id)
    .then(() => {
      res.status(200).json({ message: `Recipe ${recipe_id} has been removed` });
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

router.post("/name", (req, res) => {
  const { recipe_name } = req.body;

  Recipe.findBy({ recipe_name: recipe_name })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
