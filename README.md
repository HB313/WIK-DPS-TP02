# 🐳 TP2 DevOps : Conteneurisation

## Description du projet

Ce projet porte sur l'utilisation avancée de Docker, la création d'images optimisées (single-stage et multi-stage), le scan de vulnérabilités et les bonnes pratiques de sécurité (exécution avec utilisateur non-root).
Un bonus consiste à créer une image Docker de moins de 500 bytes.


### Objectif

- Construire une image Docker single-stage fonctionnelle.

- Construire une image Docker multi-stage optimisée.

- Scanner les images pour détecter d’éventuelles vulnérabilités.

- Appliquer les bonnes pratiques de sécurité (notamment ne pas exécuter en tant que root).

- Créer une image minimale (bonus).


## 🧩 Étape 1 : Dockerfile Single-Stage

> Fichier : `Dockerfile.single`

### ✔️ Description
Création d'une image Docker fonctionnelle en une seule étape, sans optimisation poussée.

### 🔐 Résultats du scan de vulnérabilités

```
hsh@HBs-MacBook-Air ~/Desktop/Ynov/B3/WIK-DPS-TP02$ trivy image --scanners vuln --quiet api-single                                                    main 

Report Summary

┌──────────────────────────────────────────────────────────────────────────────────┬──────────┬─────────────────┐
│                                      Target                                      │   Type   │ Vulnerabilities │
├──────────────────────────────────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ api-single (alpine 3.21.3)                                                       │  alpine  │        0        │
├──────────────────────────────────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ app/node_modules/@esbuild/darwin-arm64/package.json                              │ node-pkg │        0        │
├──────────────────────────────────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ app/node_modules/@esbuild/linux-arm64/package.json                               │ node-pkg │        0        │
├──────────────────────────────────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ app/node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-key- │ node-pkg │        0        │
│ s/package.json                                                                   │          │                 │
├──────────────────────────────────────────────────────────────────────────────────┼──────────┼─────────────────┤
...
...
...
Total: 1 (UNKNOWN: 0, LOW: 0, MEDIUM: 0, HIGH: 1, CRITICAL: 0)

┌────────────────────────────┬────────────────┬──────────┬────────┬───────────────────┬───────────────┬───────────────────────────────────────────────────┐
│          Library           │ Vulnerability  │ Severity │ Status │ Installed Version │ Fixed Version │                       Title                       │
├────────────────────────────┼────────────────┼──────────┼────────┼───────────────────┼───────────────┼───────────────────────────────────────────────────┤
│ cross-spawn (package.json) │ CVE-2024-21538 │ HIGH     │ fixed  │ 7.0.3             │ 7.0.5, 6.0.6  │ cross-spawn: regular expression denial of service │
│                            │                │          │        │                   │               │ https://avd.aquasec.com/nvd/cve-2024-21538        │
└────────────────────────────┴────────────────┴──────────┴────────┴───────────────────┴───────────────┴───────────────────────────────────────────────────┘

app/node_modules/.bin/esbuild (gobinary)

Total: 1 (UNKNOWN: 0, LOW: 0, MEDIUM: 1, HIGH: 0, CRITICAL: 0)

┌─────────┬────────────────┬──────────┬────────┬───────────────────┬────────────────┬──────────────────────────────────────────────────────────┐
│ Library │ Vulnerability  │ Severity │ Status │ Installed Version │ Fixed Version  │                          Title                           │
├─────────┼────────────────┼──────────┼────────┼───────────────────┼────────────────┼──────────────────────────────────────────────────────────┤
│ stdlib  │ CVE-2025-22871 │ MEDIUM   │ fixed  │ v1.23.7           │ 1.23.8, 1.24.2 │ net/http: Request smuggling due to acceptance of invalid │
│         │                │          │        │                   │                │ chunked data in net/http...                              │
│         │                │          │        │                   │                │ https://avd.aquasec.com/nvd/cve-2025-22871               │
└─────────┴────────────────┴──────────┴────────┴───────────────────┴────────────────┴──────────────────────────────────────────────────────────┘
...
```

📦 **Taille de l’image** : `414 MB`  
👤 **Utilisateur non-root** : ✅

---

## 🧱 Étape 2 : Dockerfile Multi-Stage

> Fichier : `Dockerfile.multi`

### ✔️ Description
Refactorisation de l’image précédente en plusieurs étapes pour :
- Réduire la taille de l’image finale.
- Exclure les dépendances de build.
- Améliorer la sécurité.

### 🔐 Résultats du scan de vulnérabilités

```
hsh@HBs-MacBook-Air ~/Desktop/Ynov/B3/WIK-DPS-TP02$ trivy image api-multi                                                                          ✹ ✭main 
2025-04-14T15:21:43+02:00       INFO    [vulndb] Need to update DB
...
...
│ les/package.json                                                                 │          │                 │         │
├──────────────────────────────────────────────────────────────────────────────────┼──────────┼─────────────────┼─────────┤
│ usr/local/lib/node_modules/npm/node_modules/wrap-ansi-cjs/package.json           │ node-pkg │        0        │    -    │
├──────────────────────────────────────────────────────────────────────────────────┼──────────┼─────────────────┼─────────┤
│ usr/local/lib/node_modules/npm/node_modules/wrap-ansi/node_modules/ansi-regex/p- │ node-pkg │        0        │    -    │
│ ackage.json                                                                      │          │                 │         │
├──────────────────────────────────────────────────────────────────────────────────┼──────────┼─────────────────┼─────────┤
│ usr/local/lib/node_modules/npm/node_modules/wrap-ansi/node_modules/emoji-regex/- │ node-pkg │        0        │    -    │
│ package.json                                                                     │          │                 │         │
├──────────────────────────────────────────────────────────────────────────────────┼──────────┼─────────────────┼─────────┤
│ usr/local/lib/node_modules/npm/node_modules/wrap-ansi/node_modules/string-width- │ node-pkg │        0        │    -    │
│ /package.json                                                                    │          │                 │         │
├──────────────────────────────────────────────────────────────────────────────────┼──────────┼─────────────────┼─────────┤
│ usr/local/lib/node_modules/npm/node_modules/wrap-ansi/node_modules/strip-ansi/p- │ node-pkg │        0        │    -    │
│ ackage.json                                                                      │          │                 │         │
├──────────────────────────────────────────────────────────────────────────────────┼──────────┼─────────────────┼─────────┤
│ usr/local/lib/node_modules/npm/node_modules/wrap-ansi/package.json               │ node-pkg │        0        │    -    │
├──────────────────────────────────────────────────────────────────────────────────┼──────────┼─────────────────┼─────────┤
│ usr/local/lib/node_modules/npm/node_modules/write-file-atomic/package.json       │ node-pkg │        0        │    -    │
├──────────────────────────────────────────────────────────────────────────────────┼──────────┼─────────────────┼─────────┤
│ usr/local/lib/node_modules/npm/node_modules/yallist/package.json                 │ node-pkg │        0        │    -    │
├──────────────────────────────────────────────────────────────────────────────────┼──────────┼─────────────────┼─────────┤
│ usr/local/lib/node_modules/npm/package.json                                      │ node-pkg │        0        │    -    │
└──────────────────────────────────────────────────────────────────────────────────┴──────────┴─────────────────┴─────────┘
Legend:
- '-': Not scanned
- '0': Clean (no security findings detected)


Node.js (node-pkg)

Total: 1 (UNKNOWN: 0, LOW: 0, MEDIUM: 0, HIGH: 1, CRITICAL: 0)

┌────────────────────────────┬────────────────┬──────────┬────────┬───────────────────┬───────────────┬───────────────────────────────────────────────────┐
│          Library           │ Vulnerability  │ Severity │ Status │ Installed Version │ Fixed Version │                       Title                       │
├────────────────────────────┼────────────────┼──────────┼────────┼───────────────────┼───────────────┼───────────────────────────────────────────────────┤
│ cross-spawn (package.json) │ CVE-2024-21538 │ HIGH     │ fixed  │ 7.0.3             │ 7.0.5, 6.0.6  │ cross-spawn: regular expression denial of service │
│                            │                │          │        │                   │               │ https://avd.aquasec.com/nvd/cve-2024-21538        │
└────────────────────────────┴────────────────┴──────────┴────────┴───────────────────┴───────────────┴───────────────────────────────────────────────────┘
```

📦 **Taille de l’image** : `199 MB`  
👤 **Utilisateur non-root** : ✅

**Vulnérabilité** : 1 seule, facilement corrigé

---

## 🎁 Étape Bonus : Image < 500 Bytes

> Fichier : `Dockerfile.bonus`

### ✔️ Description
Challenge technique consistant à créer une image Docker de **moins de 500 bytes**, fonctionnelle selon les contraintes données. On essaye avec du C.


📦 **Taille de l’image** : `1.02 Megabytes`  
👤 **Utilisateur non-root** : ❌  
✅ Fonctionnelle : Oui

Meme si l'image est build from scratch avec un binaire depuis du code en C, il faudrait diviser son poids par 2000 pour respecter les contraintes: Pour la suite : assembly ?

---

## 🛠️ Commandes utiles

```bash
# Build des images
docker build -t wik-tp02-single -f Dockerfile.single .
docker build -t wik-tp02-multi -f Dockerfile.multi .
docker build -t wik-tp02-bonus -f Dockerfile.bonus .

# Scan avec Trivy
trivy image wik-tp02-single
trivy image wik-tp02-multi
trivy image wik-tp02-bonus
```

