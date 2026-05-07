import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './panier.html',
  styleUrl: './panier.css'
})
export class Panier implements OnInit {
  contenuPanier = signal<any[]>([]);
  
  total = computed(() => {
    return this.contenuPanier().reduce((somme, item) => somme + (item.prix * item.quantite), 0);
  });
  
  http = inject(HttpClient);

  ngOnInit() {
    // Utilisation d'une URL relative pour s'adapter automatiquement au HTTPS [cite: 13]
    this.http.get<any[]>('/api/panier').subscribe(donnees => {
        this.contenuPanier.set(donnees);
    });
  }

  // Retirer un jeu
  supprimer(id: string) {
    // Ajout du slash manquant pour l'URL
    this.http.delete('/api/panier/' + id).subscribe(() => {
      const nouvelleListe = this.contenuPanier().filter(article => article._id !== id);
      this.contenuPanier.set(nouvelleListe);
    });
  }

  // MODIFICATION ICI : On retire l'argument 'id' car on vide tout le panier lors du paiement
  payer() {
    if (this.total() === 0) return; 
    
    // On appelle l'API pour vider le panier
    this.http.delete('/api/panier').subscribe(() => {
      alert("🎉 Paiement de " + this.total().toFixed(2) + " € validé ! Merci pour votre achat chez 3iL Gaming.");
      this.contenuPanier.set([]); 
    });
  }
}