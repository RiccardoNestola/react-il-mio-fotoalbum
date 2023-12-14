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

async function aggiungiFoto(req, res) {
    try {
        const { titolo, descrizione } = req.body;
        let { visibile } = req.body;
        const immagine = req.file.path;
        const categorieIds = req.body.categorieIds.map(id => parseInt(id)).filter(id => !isNaN(id));


        visibile = visibile === 'true';

        if (!Array.isArray(categorieIds)) {
            return res.status(400).json({ errore: "categorieIds deve essere un array" });
        }

        const nuovaFoto = await prisma.foto.create({
            data: {
                titolo,
                descrizione,
                immagine,
                visibile,
                categorie: {
                    connect: categorieIds
                }
            }
        });

        res.json({ messaggio: "Foto aggiunta con successo", nuovaFoto });
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
}


async function modificaFoto(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { titolo, descrizione, immagine, visibile } = req.body;
        const fotoAggiornata = await prisma.foto.update({
            where: { id },
            data: { titolo, descrizione, immagine, visibile }
        });
        res.json(fotoAggiornata);
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
}

async function eliminaFoto(req, res) {
    try {
        const id = parseInt(req.params.id);
        await prisma.foto.delete({ where: { id } });
        res.json({ messaggio: "Foto eliminata con successo" });
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
}

module.exports = {
    listaFoto,
    dettagliFoto,
    aggiungiFoto,
    modificaFoto,
    eliminaFoto
};
