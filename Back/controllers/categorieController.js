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

module.exports = {
    listaCategorie
};
