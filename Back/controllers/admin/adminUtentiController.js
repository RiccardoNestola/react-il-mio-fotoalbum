const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listaUtenti = async (req, res) => {
    try {
        const utenti = await prisma.utente.findMany();
        res.json(utenti);
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
};

const registraUtente = async (req, res) => {

};

const modificaUtente = async (req, res) => {

};

const eliminaUtente = async (req, res) => {

};

module.exports = {
    listaUtenti,
    registraUtente,
    modificaUtente,
    eliminaUtente
};
