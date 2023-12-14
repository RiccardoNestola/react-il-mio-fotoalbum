const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listaCategorie = async (req, res) => {
    try {
        const categorie = await prisma.categoria.findMany();
        res.json(categorie);
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
};

const aggiungiCategoria = async (req, res) => {
    try {
        const { nome } = req.body;
        const nuovaCategoria = await prisma.categoria.create({
            data: { nome }
        });
        res.json(nuovaCategoria);
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
};

const modificaCategoria = async (req, res) => {

};

const eliminaCategoria = async (req, res) => {

};

module.exports = {
    listaCategorie,
    aggiungiCategoria,
    modificaCategoria,
    eliminaCategoria
};
