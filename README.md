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

| Vulnérabilité | Niveau | Paquet concerné | Résolu ? |
|---------------|--------|------------------|----------|
| ...           | ...    | ...              | ...      |

📦 **Taille de l’image** : `... MB`  
👤 **Utilisateur non-root** : ❌ / ✅

---

## 🧱 Étape 2 : Dockerfile Multi-Stage

> Fichier : `Dockerfile.multi`

### ✔️ Description
Refactorisation de l’image précédente en plusieurs étapes pour :
- Réduire la taille de l’image finale.
- Exclure les dépendances de build.
- Améliorer la sécurité.

### 🔐 Résultats du scan de vulnérabilités

| Vulnérabilité | Niveau | Paquet concerné | Résolu ? |
|---------------|--------|------------------|----------|
| ...           | ...    | ...              | ...      |

📦 **Taille de l’image** : `... MB`  
👤 **Utilisateur non-root** : ✅

---

## 🎁 Étape Bonus : Image < 500 Bytes

> Fichier : `Dockerfile.bonus`

### ✔️ Description
Challenge technique consistant à créer une image Docker de **moins de 500 bytes**, fonctionnelle selon les contraintes données.

### 🔐 Résultats du scan de vulnérabilités

| Vulnérabilité | Niveau | Paquet concerné | Résolu ? |
|---------------|--------|------------------|----------|
| ...           | ...    | ...              | ...      |

📦 **Taille de l’image** : `... bytes`  
👤 **Utilisateur non-root** : ✅ / ❌  
✅ Fonctionnelle : Oui / Non

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

