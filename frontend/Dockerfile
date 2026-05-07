# --- ÉTAPE 1 : Compilation (Build) ---
FROM node:22-alpine AS build
WORKDIR /app
RUN npm install -g @angular/cli

# Copie des dépendances et installation
COPY package*.json ./
RUN npm install

# Copie de tout le code source Angular
COPY . .

# Compilation de l'application pour la production
RUN npm run build --configuration=production

# --- ÉTAPE 2 : Serveur Web (Nginx) ---
FROM nginx:alpine

# On copie les fichiers compilés de l'Étape 1 vers le dossier que Nginx sert par défaut
# ATTENTION : Vérifie le chemin exact dans ton dossier "dist" après un build local. 
# Selon ta version d'Angular, ce sera "dist/projet-tableau", "dist/projet-tableau/browser" ou "dist/browser"
COPY --from=build /app/dist/projet-tableau/browser /usr/share/nginx/html

# On expose le port 80 du serveur Nginx
EXPOSE 80
