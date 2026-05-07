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
  @Input() titre: string = ''; 
  @Input() imageUrl: string = ''; 
  @Input() prix: number = 0; 
  @Input() buttonColor: string = '#007bff'; 

  http = inject(HttpClient); 
  
  toastMessage: string = '';

  ajouterAuPanier() {
    const jeuAAjouter = { titre: this.titre, prix: this.prix };
    
    // 🔴 CORRECTION : On utilise l'URL relative au lieu de l'IP
    this.http.post('/api/panier', jeuAAjouter)
      .subscribe(() => {
        this.toastMessage = "✅ " + this.titre + " ajouté au panier !";
        
        setTimeout(() => {
          this.toastMessage = '';
        }, 3000);
      });
  }
}