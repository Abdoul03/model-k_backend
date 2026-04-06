# 1. Image de base : on utilise Node.js version 20 (Alpine est plus léger)
FROM node:20-alpine

# 2. Créer le dossier de l'application dans le conteneur
WORKDIR /usr/src/app

# 3. Copier les fichiers de dépendances en premier
# Cela permet de mettre en cache les node_modules si tu ne changes pas tes packages
COPY package*.json ./

# 4. Installer les dépendances
RUN npm install

# 5. Copier tout le reste du code source
COPY . .

# 6. Exposer le port sur lequel ton serveur NestJS tourne
EXPOSE 3000

# 7. Lancer l'application en production
CMD ["npm", "run", "build"]