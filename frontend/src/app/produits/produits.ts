import { Component, OnInit, inject, signal } from '@angular/core'; 
import { CarteNom } from '../carte-nom/carte-nom';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CarteNom], // On importe le sous-composant qui sert à afficher une carte de jeu
  templateUrl: './produits.html',
  styleUrl: './produits.css'
})
export class Produits implements OnInit {
  
  // Utilisation d'un signal Angular pour stocker la liste des jeux de manière réactive
  mesCartes = signal<any[]>([]); 
  
  // Injection du service HTTP pour pouvoir faire notre requête
  http = inject(HttpClient); 

  ngOnInit() {
    // Requête GET vers Nginx (qui transmet à notre API Node.js)
    this.http.get<any[]>('/api/produits')
      .subscribe(donnees => {
        // Une fois les données de la BDD reçues, on met à jour notre signal pour l'affichage
        this.mesCartes.set(donnees);
      });
  }
}