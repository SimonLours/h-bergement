import { Component, Input, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carte-nom',
  standalone: true,
  imports: [],
  templateUrl: './carte-nom.html',
  styleUrl: './carte-nom.css'
})
export class CarteNom {
  // Les décorateurs @Input() permettent à ce composant enfant de recevoir des variables 
  // directement depuis son parent (la page Produits)
  @Input() titre: string = ''; 
  @Input() imageUrl: string = ''; 
  @Input() prix: number = 0; 
  @Input() buttonColor: string = '#007bff'; 

  // Injection du service pour communiquer avec l'API
  http = inject(HttpClient); 
  
  // Variable pour afficher un petit message de confirmation temporaire
  toastMessage: string = '';

  // Fonction déclenchée au clic sur le bouton d'achat
  ajouterAuPanier() {
    // On prépare l'objet qu'on va envoyer au Backend
    const jeuAAjouter = { titre: this.titre, prix: this.prix };
    
    // 🔴 CORRECTION : On utilise l'URL relative au lieu de l'IP
    // Requête POST vers l'API pour ajouter l'élément dans la collection Mongo "Panier"
    this.http.post('/api/panier', jeuAAjouter)
      .subscribe(() => {
        // Une fois l'ajout validé par le serveur, on affiche le message de succès
        this.toastMessage = "✅ " + this.titre + " ajouté au panier !";
        
        // On efface le message automatiquement après 3 secondes (3000 millisecondes)
        setTimeout(() => {
          this.toastMessage = '';
        }, 3000);
      });
  }
}