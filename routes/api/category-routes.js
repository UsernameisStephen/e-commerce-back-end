const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const getCategories = await Category.findAll ({include: [{ model: Product }], });
    res.status(200).json(getCategories);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getCategories = await Category.findByProd(req.params.id, {include: [Product] });
    if (!getCategories) {
      res.status(404).json({message: 'This is not the Product ID you were looking for.'});
      return;
    }
    res.status(200).json(getCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const addCat = await Category.create({
      category_name: req.body.category_name,
    });
   
    res.status(200).json(addCat);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

    try {
      const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      category_name: req.body.category_name
    })
    res.status(200).json(updateCat);
    } catch (err) {
      res.status(400).json(err);
    }
  
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
   
    if (!deleCat) {
      res.status(404).json({message: 'This is not the Category you were looking for.'});
      return;
    }
    res.status(200).json(deleCat);
  } catch (err) {
    res.status(500).json(err);
  }


});

module.exports = router;
