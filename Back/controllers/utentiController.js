const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');


const registraUtente = async (req, res) => {
    try {
        console.log("Dati ricevuti:", req.body);
        const { email, password, nome } = req.body;


        const utenteEsistente = await prisma.user.findUnique({
            where: { email }
        });
        if (utenteEsistente) {
            return res.status(400).json({ messaggio: "Un utente con questa email esiste già." });
        }


        const salt = await bcrypt.genSalt(10);
        const passwordCriptata = await bcrypt.hash(password, salt);


        const nuovoUtente = await prisma.user.create({
            data: {
                email,
                password: passwordCriptata,
                nome,
                ruolo: 'USER'
            }
        });

        res.status(201).json({ utente: { id: nuovoUtente.id, email: nuovoUtente.email, nome: nuovoUtente.nome } });
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
};


const loginUtente = async (req, res) => {
    try {
        const { email, password } = req.body;
        const utente = await prisma.user.findUnique({ where: { email } });

        if (!utente || !await bcrypt.compare(password, utente.password)) {
            return res.status(401).json({ messaggio: "Email o password non corretti" });
        }

        const token = jwt.sign({ userId: utente.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
};

module.exports = {
    registraUtente,
    loginUtente
};
