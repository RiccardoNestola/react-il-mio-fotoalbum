const express = require('express');
const router = express.Router();
const fotoController = require('../../controllers/fotoController');

router.get('/', fotoController.listaFoto);

router.get('/:id', fotoController.dettagliFoto);


module.exports = router;
