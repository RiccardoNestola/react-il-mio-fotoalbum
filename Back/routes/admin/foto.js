const express = require('express');
const router = express.Router();
const multer = require('multer');

const adminFotoController = require('../../controllers/admin/adminFotoController');
const authMiddleware = require('../../middleware/authMiddleware');

// Configurazione di multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });




router.post('/carica', authMiddleware, upload.single('immagine'), adminFotoController.aggiungiFoto);


router.put('/:id', authMiddleware, adminFotoController.modificaFoto);


router.delete('/:id', authMiddleware, adminFotoController.eliminaFoto);


module.exports = router;
