const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function listaFotoPersonali(req, res) {
    try {
        console.log("User:", req.user.userId);
        const idUtente = req.user.userId;
        const mieFoto = await prisma.foto.findMany({
            where: {
                userId: idUtente
            },
            include: {
                categorie: true




            }
        });

        res.json(mieFoto);
        console.log("Mie foto:", mieFoto);
    } catch (errore) {
        res.status(500).json({ messaggio: errore.message });
    }
}

async function dettagliFoto(req, res) {
    try {
        const id = parseInt(req.params.id);
        const foto = await prisma.foto.findUnique({
            where: { id },
            include: {
                categorie: true
            }
        });
        res.json(foto);
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
}

async function aggiungiFoto(req, res) {
    try {
        const { titolo, descrizione } = req.body;
        let { visibile } = req.body;
        const userId = req.user?.userId;
        const immagine = req.file.path;
        const categorieIds = req.body.categorieIds.map(id => parseInt(id)).filter(id => !isNaN(id));


        visibile = visibile === 'true';

        if (!Array.isArray(categorieIds)) {
            return res.status(400).json({ errore: "categorieIds deve essere un array" });
        }

        if (typeof userId === 'undefined') {
            return res.status(400).json({ errore: "userId è undefined" });
        }

        const nuovaFoto = await prisma.foto.create({
            data: {
                titolo,
                descrizione,
                immagine,
                visibile,
                userId,
                categorie: {
                    connect: categorieIds.map(id => ({ id }))
                }
            }
        });

        const categorie = await prisma.categoria.findMany({
            where: {
                id: {
                    in: categorieIds
                }
            },
            select: {
                id: true,
                nome: true
            }
        });

        console.log("Categorie IDs:", categorieIds);

        res.json({
            messaggio: "Foto aggiunta con successo",
            nuovaFoto,
            categorie: categorie.map(categoria => categoria.nome)
        });
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
}


async function modificaFoto(req, res) {
    try {
        console.log("Richiesta:", req.params.id);
        console.log("Body:", req.body);
        const id = parseInt(req.params.id);
        let updates = req.body;


        if ('visibile' in updates) {
            updates = { ...updates, visibile: updates.visibile === 'true' || updates.visibile === true };
        }


        const fotoAggiornata = await prisma.foto.update({
            where: { id },
            data: { ...updates }
        });

        res.json(fotoAggiornata);
        console.log("Foto aggiornata:", fotoAggiornata);
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
    listaFotoPersonali,
    dettagliFoto,
    aggiungiFoto,
    modificaFoto,
    eliminaFoto
};
