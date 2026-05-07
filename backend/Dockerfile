# On part d'une image Node.js légère
FROM node:18-alpine

# On définit le dossier de travail dans le conteneur
WORKDIR /app

# On copie d'abord les fichiers listant les dépendances
COPY package*.json ./

# On installe UNIQUEMENT les dépendances nécessaires pour la production
# C'est la bonne pratique que tu as vue en TP pour réduire la taille et sécuriser l'image !
RUN npm install --production

# On copie le reste du code (dont serveur.js)
COPY . .

# On expose les deux ports utilisés par tes APIs
EXPOSE 8000 8080

# La commande pour démarrer le serveur
CMD ["node", "serveur.js"]