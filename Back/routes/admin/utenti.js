const express = require('express');
const router = express.Router();
const adminUtentiController = require('../../controllers/admin/adminUtentiController');

router.get('/', adminUtentiController.listaUtenti);
router.put('/:id', adminUtentiController.modificaUtente);
router.delete('/:id', adminUtentiController.eliminaUtente);

module.exports = router;
