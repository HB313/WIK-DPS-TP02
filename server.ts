import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// Charger les variables d'environement
dotenv.config();
//lancer une instance d'express
const app = express();

// PORT prend la valuer definie dans le fichier .env ou 3000
const PORT = process.env.PING_LISTEN_PORT || 3000;

//Definir la route GET /ping
app.get('/ping', (req: Request, res: Response) => {
    res.json(req.headers);
});

//Erreur 404 pour les routes non définies
app.use((req, res) => {
    res.status(404).send();
});

//Demarre le serveur
app.listen(PORT, () => {
    console.log(`Serveur UP sur le port ${PORT}`);
});
