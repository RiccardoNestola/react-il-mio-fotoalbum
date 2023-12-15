const express = require('express');
const router = express.Router();
const categorieController = require('../../controllers/categorieController');

router.get('/:id', categorieController.dettaglioCategoria);
router.get('/', categorieController.listaCategorie);

module.exports = router;
