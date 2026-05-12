import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Import du module pour pouvoir communiquer avec notre API (Backend)
import { provideHttpClient } from '@angular/common/http'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Activation du système de routes
    // Activation globale du client HTTP pour autoriser les requêtes GET/POST partout dans l'app
    provideHttpClient() 
  ]
};