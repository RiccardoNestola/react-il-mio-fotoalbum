const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listaCategorie = async (req, res) => {
    try {
        const categorie = await prisma.categoria.findMany({
            include: {
                foto: true
            }
        });

        res.json(categorie);
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
};

const dettaglioCategoria = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const categoria = await prisma.categoria.findUnique({
            where: { id },
            include: {
                foto: true
            }
        });
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
}

module.exports = {
    listaCategorie,
    dettaglioCategoria
};
