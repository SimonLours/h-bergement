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
    this.http.get<any[]>('/api/panier').subscribe(donnees => {
        this.contenuPanier.set(donnees);
    });
  }

  // NOUVEAU : Retirer un jeu
  supprimer(id: string) {
    this.http.delete('/api/panier' + id).subscribe(() => {
      // On filtre la liste pour enlever le jeu supprimé et on met à jour le signal
      const nouvelleListe = this.contenuPanier().filter(article => article._id !== id);
      this.contenuPanier.set(nouvelleListe);
    });
  }

  // NOUVEAU : Payer
  payer() {
    if (this.total() === 0) return; // Sécurité si le panier est vide
    
    this.http.delete('/api/panier').subscribe(() => {
      alert("🎉 Paiement de " + this.total().toFixed(2) + " € validé ! Merci pour votre achat chez 3iL Gaming.");
      this.contenuPanier.set([]); // On vide l'affichage du panier instantanément
    });
  }
}