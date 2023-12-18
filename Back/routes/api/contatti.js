const express = require('express');
const router = express.Router();
const contattiController = require('../../controllers/contattiController');

router.get('/', contattiController.listaContatti);
router.post('/aggiungi', contattiController.aggiungiContatto);

module.exports = router;
