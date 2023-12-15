const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors());

// Importo i router

const fotoRouter = require('./routes/api/foto');
const categorieRouter = require('./routes/api/categorie');
const utentiRouter = require('./routes/api/utenti');
const contattiRouter = require('./routes/api/contatti');

// Router admin

const adminFotoRouter = require('./routes/admin/foto');
const adminCategorieRouter = require('./routes/admin/categorie');
const adminUtentiRouter = require('./routes/admin/utenti');

// Configurazioni di Middleware, CORS e autenticazione

const authMiddleware = require('./middleware/authMiddleware');


// Router
app.use('/api/foto', fotoRouter);
app.use('/api/categorie', categorieRouter);
app.use('/api/utenti', utentiRouter);
app.use('/api/contatti', contattiRouter);

// Router admin
app.use('/api/admin/foto', authMiddleware, adminFotoRouter);
app.use('/api/admin/categorie', authMiddleware, adminCategorieRouter);
app.use('/api/admin/utenti', authMiddleware, adminUtentiRouter);

// File statici
app.use('/uploads', express.static('uploads'));

// Gestione degli errori o rotte non trovate
app.use((req, res, next) => {
    res.status(404).send('Rotta non trovata');
});

// Avvio del server
app.listen(3000, () => {
    console.log('Server avviato su http://localhost:3000');
});
