import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Produits } from './produits/produits';
import { Panier } from './panier/panier';

export const routes: Routes = [
  { path: '', component: Accueil }, // Page par défaut (Accueil)
  { path: 'produits', component: Produits }, // Page /produits
  { path: 'panier', component: Panier } // Page /panier
];