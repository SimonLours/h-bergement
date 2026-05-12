import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Lancement de l'application Angular avec le composant racine (App)
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err)); // Affichage des erreurs dans la console si le démarrage échoue