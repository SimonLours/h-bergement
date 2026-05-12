import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. On importe l'outil pour créer des liens vers les autres pages

@Component({
  selector: 'app-accueil',
  standalone: true, // Composant autonome (nouvelle norme Angular, sans module)
  imports: [RouterLink], // 2. On l'active ici pour pouvoir utiliser routerLink dans notre HTML !
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil { }