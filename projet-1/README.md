# 🚀 Portfolio Portfolio - Morvin Quernel

Portfolio professionnel moderne et responsive développé avec React et Tailwind CSS, connecté à une API Symfony backend.

## ✨ Fonctionnalités

- 🌓 **Thème sombre/clair** avec transitions fluides
- 📱 **Design responsive** optimisé pour tous les appareils
- 🎨 **Interface moderne** avec animations et transitions
- 📧 **Formulaire de contact** fonctionnel connecté à l'API
- 🔐 **Système d'authentification** JWT
- 📊 **Indicateur de statut API** en temps réel
- 🎭 **Animations** avec Framer Motion et AOS
- 🎯 **Navigation fluide** avec scroll progressif

## 🛠️ Technologies utilisées

### Frontend
- **React 19** - Framework JavaScript moderne
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Bibliothèque d'animations
- **React Hook Form** - Gestion des formulaires
- **Redux Toolkit** - Gestion d'état
- **Axios** - Client HTTP

### Backend
- **Symfony 7** - Framework PHP
- **API Platform** - API REST
- **JWT** - Authentification
- **MySQL** - Base de données
- **Docker** - Conteneurisation

## 🚀 Installation et démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn
- Docker et Docker Compose (pour le backend)

### 1. Cloner le projet
```bash
git clone <repository-url>
cd Projets_react
```

### 2. Installer les dépendances Frontend
```bash
cd projet-1
npm install
```

### 3. Installer et démarrer le Backend
```bash
cd ../be
docker-compose up -d
```

### 4. Démarrer le Frontend
```bash
cd ../projet-1
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
projet-1/
├── src/
│   ├── components/          # Composants React
│   ├── store/              # Redux store et slices
│   ├── services/           # Services API
│   ├── lib/                # Configuration et utilitaires
│   └── App.js              # Composant principal
├── public/                  # Fichiers statiques
└── package.json            # Dépendances et scripts
```

## 🎯 Sections du Portfolio

1. **🏠 Accueil** - Présentation et introduction
2. **💼 Projets** - Portfolio des réalisations
3. **🛠️ Compétences** - Technologies et niveaux
4. **📚 Formation** - Parcours et certifications
5. **📞 Contact** - Formulaire de contact et informations

## 🔧 Configuration

### Variables d'environnement
Créez un fichier `.env` à la racine du projet frontend :

```env
REACT_APP_API_URL=http://localhost:8080/api
```

### Configuration API
L'API backend est configurée pour fonctionner sur le port 8080 avec Docker.

## 📱 Responsive Design

Le portfolio est entièrement responsive et optimisé pour :
- 📱 **Mobile** (320px+)
- 📱 **Tablette** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Grand écran** (1280px+)

## 🎨 Personnalisation

### Thème
- **Mode clair** : Couleurs claires et modernes
- **Mode sombre** : Palette sombre élégante
- **Transitions fluides** entre les modes

### Couleurs
- **Primaire** : Bleu (#2563eb)
- **Secondaire** : Gris (#6b7280)
- **Accent** : Bleu clair (#3b82f6)

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Déploiement sur Vercel/Netlify
1. Connectez votre repository
2. Configurez les variables d'environnement
3. Déployez automatiquement

## 🔍 Tests

```bash
# Tests unitaires
npm test

# Tests avec couverture
npm test -- --coverage
```

## 📊 Performance

- ⚡ **Lazy loading** des composants
- 🎯 **Code splitting** automatique
- 🖼️ **Optimisation des images**
- 🚀 **PWA ready**

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Morvin Quernel**
- 📧 Email : quernel.morvin@icloud.com
- 🔗 LinkedIn : [Morvin Quernel](https://www.linkedin.com/in/morvin-quernel-9784a3345/)
- 🐙 GitHub : [MorvinQUERNEL](https://github.com/MorvinQUERNEL)

## 🙏 Remerciements

- **EEDN** - École des métiers du numérique
- **Create React App** - Outil de démarrage
- **Tailwind CSS** - Framework CSS
- **Framer Motion** - Animations
- **Symfony** - Framework backend

---

⭐ **N'oubliez pas de mettre une étoile au projet si vous l'aimez !**

## 📋 Scripts disponibles

Dans le répertoire du projet, vous pouvez exécuter :

### `npm start`
Lance l'application en mode développement.\
Ouvrez [http://localhost:3000](http://localhost:3000) pour la voir dans votre navigateur.

La page se recharge automatiquement lors des modifications.\
Vous verrez également les erreurs de lint dans la console.

### `npm test`
Lance le test runner en mode interactif.\
Voir la section sur [l'exécution des tests](https://facebook.github.io/create-react-app/docs/running-tests) pour plus d'informations.

### `npm run build`
Construit l'application pour la production dans le dossier `build`.\
Il bundle correctement React en mode production et optimise la build pour les meilleures performances.

La build est minifiée et les noms de fichiers incluent des hashes.\
Votre application est prête à être déployée !

### `npm run eject`
**Note : cette opération est irréversible. Une fois que vous `eject`, vous ne pouvez plus revenir en arrière !**

Si vous n'êtes pas satisfait des choix d'outils de build et de configuration, vous pouvez `eject` à tout moment. Cette commande supprimera la dépendance de build unique de votre projet.

## 📚 En savoir plus

Vous pouvez en apprendre plus dans la [documentation Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Pour apprendre React, consultez la [documentation React](https://reactjs.org/).
