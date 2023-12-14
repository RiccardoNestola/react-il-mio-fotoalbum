const express = require('express');
const router = express.Router();
const utentiController = require('../../controllers/utentiController');

router.post('/registrazione', utentiController.registraUtente);
router.post('/login', utentiController.loginUtente);


module.exports = router;
