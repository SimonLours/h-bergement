import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // Outils pour gérer la navigation entre les pages

@Component({
  selector: 'app-root', // Le nom de la balise HTML qui contiendra toute l'app
  standalone: true, // composant autonome qui n'a pas besoin d'être déclaré dans un module
  imports: [RouterOutlet, RouterLink], // On active les outils de routage pour ce composant
  templateUrl: './app.html', // Lien vers le code HTML de l'interface
  styleUrl: './app.css' // Lien vers le style de la page
})
export class App { 
  title = 'projet-tableau';
}