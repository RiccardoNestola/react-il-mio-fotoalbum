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
        const { titolo, descrizione, categorie } = req.body;
        let { visibile } = req.body;
        const userId = req.user?.userId;
        const immagine = req.file.path;

        visibile = visibile === 'true';

        if (typeof userId === 'undefined') {
            return res.status(400).json({ errore: "userId è undefined" });
        }

        if (!Array.isArray(categorie)) {
            return res.status(400).json({ errore: "categorie deve essere un array" });
        }

        const categorieProcessed = await Promise.all(categorie.map(async (nomeCategoria) => {
            let categoria = await prisma.categoria.findFirst({
                where: { nome: nomeCategoria }
            });

            if (!categoria) {
                categoria = await prisma.categoria.create({
                    data: { nome: nomeCategoria }
                });
            }

            return categoria;
        }));


        const nuovaFoto = await prisma.foto.create({
            data: {
                titolo,
                descrizione,
                immagine,
                visibile,
                userId,
                categorie: {
                    connect: categorieProcessed.map(categoria => ({ id: categoria.id }))
                }
            }
        });

        res.json({
            messaggio: "Foto aggiunta con successo",
            nuovaFoto,
            categorie: categorieProcessed.map(categoria => categoria.nome)
        });
    } catch (error) {
        res.status(500).json({ errore: error.message });
    }
}




async function modificaFoto(req, res) {
    try {
        const id = parseInt(req.params.id);
        let updates = req.body;


        if ('visibile' in updates) {
            updates.visibile = updates.visibile === 'true' || updates.visibile === true;
        }


        if ('categorie' in updates && Array.isArray(updates.categorie)) {
            const categorieProcessed = await Promise.all(updates.categorie.map(async (nomeCategoria) => {
                let categoria = await prisma.categoria.findFirst({
                    where: { nome: nomeCategoria }
                });

                if (!categoria) {
                    categoria = await prisma.categoria.create({
                        data: { nome: nomeCategoria }
                    });
                }
                return { id: categoria.id };
            }));

            updates = {
                ...updates,
                categorie: {
                    set: [],
                    connect: categorieProcessed
                }
            };
        }


        if (req.file) {
            updates.immagine = req.file.path;
        }

        const fotoAggiornata = await prisma.foto.update({
            where: { id },
            data: updates,
            include: {
                categorie: true
            }
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
        await prisma.foto.delete({
            where: { id }
        });
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
