const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function listaFoto(req, res) {
    try {
        const foto = await prisma.foto.findMany();
        res.json(foto);
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
}

async function dettagliFoto(req, res) {
    try {
        const id = parseInt(req.params.id);
        const foto = await prisma.foto.findUnique({ where: { id } });
        res.json(foto);
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
}



module.exports = {
    listaFoto,
    dettagliFoto
};
