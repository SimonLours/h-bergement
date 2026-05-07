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
    this.http.get<any[]>('https://91.134.36.203/api/panier').subscribe(donnees => {
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
  payer(id: string) {
    if (this.total() === 0) return; // Sécurité si le panier est vide
    
    this.http.delete('https://91.134.36.203/api/panier/' + id).subscribe(() => {
      alert("🎉 Paiement de " + this.total().toFixed(2) + " € validé ! Merci pour votre achat chez 3iL Gaming.");
      this.contenuPanier.set([]); // On vide l'affichage du panier instantanément
    });
  }
}