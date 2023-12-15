const express = require('express');
const router = express.Router();
const adminCategorieController = require('../../controllers/admin/adminCategorieController');

router.get('/:id', adminCategorieController.dettaglioCategoria);
router.post('/crea-categoria', adminCategorieController.aggiungiCategoria);
router.put('/:id', adminCategorieController.modificaCategoria);
router.delete('/:id', adminCategorieController.eliminaCategoria);

module.exports = router;
