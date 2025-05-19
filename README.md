# 🍽️ MealPlanner

MealPlanner est une application web complète pour planifier ses repas facilement. Grâce à une interface intuitive, tu peux rechercher des recettes, les organiser par semaine, et générer une liste de courses. Elle repose sur un back-end NestJS + Prisma + PostgreSQL et un front-end en Vue.js 3 Composition API.

---

## ✨ Fonctionnalités

- 🔍 Recherche de recettes par mots-clés, tags ou type
- 🗓️ Planification des repas sur un calendrier hebdomadaire (à venir 🔜)
- 📋 Création de listes de courses basées sur les recettes sélectionnées (à venir 🔜)
- 💾 Sauvegarde des recettes favorites (à venir 🔜)
- 👤 Gestion des préférences utilisateur (régimes alimentaires, allergies, prise de masse, sèche, etc. ; à venir 🔜)

---

## 🧰 Stack technique

| Côté | Techno |
|------|--------|
| Frontend | Vue.js 3 (Composition API avec Typescript), Vite, Pinia, Vue Router |
| Backend | NestJS avec Typescript, Prisma ORM, PostgreSQL |
| Base de données | PostgreSQL 15 (via Docker) |
| Dev tools | Docker Compose, PgAdmin, dotenv |
| Auth | JWT |

---

## 📑 API

L'application expose une API RESTful qui permet de gérer les recettes, les utilisateurs, les tags et l'authentification.

### 🌐 Swagger UI

Pour accéder à la documentation interactive de l'API, tu peux utiliser **Swagger UI** à l'adresse suivante :

[http://localhost:3000/api](http://localhost:3000/api)

### 🔧 Endpoints disponibles

- **Authentification**
- **Utilisateurs**
- **Recettes**
- **Tags**

La documentation sera automatiquement mise à jour avec les dernières modifications des endpoints.

---

## 🚀 Lancer le projet en local

### ♻️ Étape 1 : Docker

1. Cloner le repo

```bash
git clone https://github.com/ClaudioEnsitech/MealPlanner.git
cd MealPlanner
```

2. Lancer la base de données et PgAdmin

```bash
docker-compose up -d
```

- PostgreSQL : accessible via localhost:5432
- PgAdmin : http://localhost:8080
  - Email : admin@mealplanner.dev
  - Mot de passe : admin

### 🧪 Étape 2 : Installation

#### Backend (NestJS + Prisma)

```bash
cd meal-planner-back
npm install
```

Créer un fichier .env :

```
DATABASE_URL=postgresql://dev:dev@localhost:5432/mealplanner
JWT_SECRET=your_jwt_secret
PORT=3000
```

Initialiser Prisma :

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Lancer le serveur :

```bash
npm run start:dev
```

Accès : http://localhost:3000

---

#### Frontend (Vue 3)

```bash
cd ../meal-planner-front
npm install
npm run dev
```

Accès : http://localhost:5173

## 📁 Arborescence du projet

```
MealPlanner/
├── meal-planner-back/
│   ├── src/
│   ├── prisma/
│   ├── docker-compose.yml
│   └── .env
├── meal-planner-front/
│   ├── src/
│   └── vite.config.ts
└── README.md
```

## 🐳 Services Docker
Le fichier docker-compose.yml inclut :

- PostgreSQL : base de données principale
- PgAdmin : interface web de gestion

```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    container_name: meal-planner-db
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: mealplanner
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - backend

  pgadmin:
    image: dpage/pgadmin4
    container_name: meal-planner-pgadmin
    ports:
      - '8080:80'
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@mealplanner.dev
      PGADMIN_DEFAULT_PASSWORD: admin
    depends_on:
      - db
    networks:
      - backend

volumes:
  postgres-data:

networks:
  backend:
```

## 🧪 Tests

- Intégration prochaine avec Playwright (tests e2e)
  
## 📝 Licence

Ce projet est sous licence MIT.

© ClaudioEnsitech
