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
  
  // La variable pour notre belle notification
  toastMessage: string = '';

  ajouterAuPanier() {
    const jeuAAjouter = { titre: this.titre, prix: this.prix };
    
    this.http.post('https://91.134.36.203/api/panier', jeuAAjouter)
      .subscribe(() => {
        // Au lieu d'un alert(), on remplit notre message
        this.toastMessage = "✅ " + this.titre + " ajouté au panier !";
        
        // On fait disparaître le message après 3 secondes (3000 ms)
        setTimeout(() => {
          this.toastMessage = '';
        }, 3000);
      });
  }
}