import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. On importe l'outil pour faire des requêtes
import { provideHttpClient } from '@angular/common/http'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 2. On l'active pour toute l'application
    provideHttpClient() 
  ]
};