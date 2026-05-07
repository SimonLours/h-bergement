import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. On importe l'outil

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink], // 2. On l'active ici !
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil { }