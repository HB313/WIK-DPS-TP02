"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// Charger les variables d'environement
dotenv_1.default.config();
//lancer une instance d'express
const app = (0, express_1.default)();
// PORT prend la valuer definie dans le fichier .env ou 3000
const PORT = process.env.PING_LISTEN_PORT || 3000;
//Definir la route GET /ping
app.get('/ping', (req, res) => {
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
