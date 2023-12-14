const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ messaggio: 'Accesso negato. Nessun token fornito.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Errore nella verifica del token:", error);
        res.status(401).json({ messaggio: 'Token non valido.' });
    }
};


module.exports = authMiddleware;
