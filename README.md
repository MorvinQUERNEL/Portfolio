# 🚀 Portfolio Personnel - Morvin QUERNEL

> **Développé entièrement par Morvin QUERNEL** - Portfolio professionnel moderne avec architecture full-stack

## 📋 Description du Projet

Ce portfolio présente une architecture complète full-stack développée de A à Z, comprenant :
- **Frontend React** : Interface utilisateur moderne et responsive avec animations fluides
- **Backend Symfony** : API REST robuste avec authentification JWT et base de données
- **Docker** : Environnement de développement containerisé
- **Design System** : Interface utilisateur cohérente avec thème sombre/clair

## ✨ Fonctionnalités Principales

### 🎨 Frontend (React)
- **Interface moderne** avec Tailwind CSS et Framer Motion
- **Thème adaptatif** (sombre/clair) avec persistance locale
- **Animations fluides** avec AOS (Animate On Scroll)
- **Responsive design** optimisé pour tous les appareils
- **Gestion d'état** avec Redux Toolkit
- **Formulaires** avec React Hook Form
- **Icônes** avec React Icons

### 🔧 Backend (Symfony 7.3)
- **API REST** avec API Platform
- **Authentification JWT** sécurisée
- **Base de données** avec Doctrine ORM
- **Migrations** automatisées
- **CORS** configuré pour le développement
- **Validation** des données
- **Tests** avec PHPUnit

### 🐳 Infrastructure
- **Docker Compose** pour l'environnement complet
- **Apache** configuré pour le backend
- **PHP 8.2+** avec extensions optimisées
- **Base de données** relationnelle

## 🛠️ Technologies Utilisées

### Frontend
- **React 19.1.1** - Bibliothèque UI moderne
- **Tailwind CSS 3.4** - Framework CSS utilitaire
- **Framer Motion 12.23** - Animations avancées
- **Redux Toolkit 2.8** - Gestion d'état
- **React Hook Form 7.62** - Gestion des formulaires
- **AOS 2.3** - Animations au scroll

### Backend
- **Symfony 7.3** - Framework PHP moderne
- **API Platform 4.1** - Génération d'API REST
- **Doctrine ORM 3.5** - Mapping objet-relationnel
- **Lexik JWT Bundle 3.1** - Authentification JWT
- **PHP 8.2+** - Version PHP moderne

### DevOps & Outils
- **Docker & Docker Compose** - Containerisation
- **Apache** - Serveur web
- **Composer** - Gestionnaire de dépendances PHP
- **Git** - Contrôle de version

## 🚀 Installation et Démarrage

### Prérequis
- Docker et Docker Compose installés
- Node.js 18+ (pour le frontend)
- Git

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/portfolio.git
cd portfolio
```

### 2. Démarrer le backend
```bash
cd be
docker-compose up -d
```

### 3. Installer les dépendances du frontend
```bash
cd ../projet-1
npm install
```

### 4. Démarrer le frontend
```bash
npm start
```

### 5. Accéder aux applications
- **Frontend** : http://localhost:3000
- **Backend** : http://localhost:8080
- **API** : http://localhost:8080/api

## 📁 Structure du Projet

```
Portfolio/
├── be/                          # Backend Symfony
│   ├── app/                     # Application Symfony
│   │   ├── src/                # Code source PHP
│   │   ├── config/             # Configuration
│   │   ├── migrations/         # Migrations base de données
│   │   └── public/             # Fichiers publics
│   ├── docker-compose.yaml     # Configuration Docker
│   └── apache/                 # Configuration Apache
├── projet-1/                    # Frontend React
│   ├── src/                    # Code source React
│   ├── public/                 # Fichiers publics
│   └── package.json            # Dépendances Node.js
└── README.md                   # Documentation
```

## 🔐 Configuration

### Variables d'environnement
Créez un fichier `.env` dans le dossier `be/app/` :

```env
DATABASE_URL="mysql://user:password@db:3306/portfolio"
JWT_SECRET_KEY="votre-clé-secrète-jwt"
CORS_ALLOW_ORIGIN="http://localhost:3000"
```

### Base de données
```bash
cd be/app
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
```

## 🧪 Tests

### Backend (PHPUnit)
```bash
cd be/app
php bin/phpunit
```

### Frontend (Jest)
```bash
cd projet-1
npm test
```

## 📱 Fonctionnalités Développées

- ✅ **Interface utilisateur moderne** avec design system cohérent
- ✅ **Authentification JWT** complète
- ✅ **Gestion des thèmes** (sombre/clair)
- ✅ **Animations fluides** et transitions
- ✅ **Responsive design** pour tous les écrans
- ✅ **API REST** documentée avec API Platform
- ✅ **Base de données** avec migrations
- ✅ **Containerisation Docker** complète
- ✅ **Tests automatisés** frontend et backend
- ✅ **Optimisation des performances** avec lazy loading

## 🌟 Points Forts du Développement

- **Architecture modulaire** et maintenable
- **Code propre** avec bonnes pratiques
- **Documentation** complète
- **Tests** automatisés
- **Déploiement** simplifié avec Docker
- **Performance** optimisée
- **Sécurité** renforcée (JWT, CORS, validation)

## 📈 Évolutions Futures

- [ ] **PWA** (Progressive Web App)
- [ ] **Blog intégré** avec gestion de contenu
- [ ] **Dashboard admin** pour la gestion
- [ ] **Analytics** et métriques de performance
- [ ] **CI/CD** automatisé
- [ ] **Monitoring** et logging avancés

## 👨‍💻 Développeur

**Morvin QUERNEL** - Développeur Full-Stack

- 🎯 **Expertise** : React, Symfony, Docker, DevOps
- 🚀 **Passion** : Développement moderne et architecture scalable
- 💡 **Approche** : Code propre, tests automatisés, déploiement continu

## 📄 Licence

Ce projet est développé entièrement par **Morvin QUERNEL** et est destiné à un usage personnel et professionnel.

---

⭐ **N'hésitez pas à donner une étoile si ce portfolio vous plaît !** ⭐

*Développé avec ❤️ et beaucoup de ☕ par Morvin QUERNEL*
