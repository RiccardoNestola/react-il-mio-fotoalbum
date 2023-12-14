const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listaContatti = async (req, res) => {
    try {
        const contatti = await prisma.contatto.findMany();
        res.json(contatti);
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
};

const aggiungiContatto = async (req, res) => {
    try {
        const { email, messaggio } = req.body;
        const nuovoContatto = await prisma.contatto.create({
            data: { email, messaggio }
        });
        res.json(nuovoContatto);
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
};

module.exports = {
    listaContatti,
    aggiungiContatto
};
