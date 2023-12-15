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

    try {
        const { id, nome } = req.body;
        const categoriaModificata = await prisma.categoria.update({
            where: { id },
            data: { nome }
        });
        res.json(categoriaModificata);
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }

};

const eliminaCategoria = async (req, res) => {
    try {
        const id = parseInt(req.params.id);


        const categoriaEsistente = await prisma.categoria.findUnique({
            where: { id }
        });

        if (!categoriaEsistente) {
            return res.status(404).json({ messaggio: "Categoria non trovata" });
        }


        const categoriaEliminata = await prisma.categoria.delete({
            where: { id }
        });

        res.json({ messaggio: "Categoria eliminata con successo", categoriaEliminata });
    } catch (error) {

        if (error.code === 'P2003') {
            return res.status(400).json({ errore: "Impossibile eliminare la categoria perché è in uso" });
        }
        res.status(500).json({ errore: error.message });
    }
};


module.exports = {
    listaCategorie,
    dettaglioCategoria,
    aggiungiCategoria,
    modificaCategoria,
    eliminaCategoria
};
