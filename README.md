# TP1 DevOps: Developpement API 

## Description du projet

Ce projet consiste à créer une API en TypeScript utilisant Express et dotenv. L'API est configurée pour répondre à la route /ping avec les headers de la requête en format JSON. Elle est également configurée pour écouter sur un port personnalisé, défini par la variable d'environnement PING_LISTEN_PORT.

## Installation et lancement

### Prérequis
- Node.js installé 
- NPM installé 

### Dependances utilisés

- Express
- TypeScript
- dotenv
- tsx

### Étapes

1. Cloner le dépôt :
   ```
   git clone https://github.com/HB313/wik-dps-tp01.git
   cd wik-dps-tp01
   ```

2. Installer les dépendances :
   ```
   npm install
   ```
## Demarrer l'application

### En Developpement(avec tsx)

```
npm run dev
```

### En production

```
npm run build
npm run start
```

## Utilisation de l'API

#### GET /ping : retourne un objet JSON avec les headers de la requete.

#### Exemple de reponse 
```
host	"localhost:4000"
user-agent	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:136.0) Gecko/20100101 Firefox/136.0"
accept	"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
accept-language	"en-US,en;q=0.5"
accept-encoding	"gzip, deflate, br, zstd"
connection	"keep-alive"
upgrade-insecure-requests	"1"
sec-fetch-dest	"document"
sec-fetch-mode	"navigate"
sec-fetch-site	"none"
...
```

#### Route autres

Retourne une Erreur 404 Vide

