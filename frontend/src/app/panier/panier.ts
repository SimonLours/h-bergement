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

  supprimer(id: string) {
    this.http.delete('/api/panier/' + id).subscribe(() => {
      const nouvelleListe = this.contenuPanier().filter(article => article._id !== id);
      this.contenuPanier.set(nouvelleListe);
    });
  }

  payer() {
    if (this.total() === 0) return; 
    
    this.http.delete('/api/panier').subscribe(() => {
      alert("🎉 Paiement de " + this.total().toFixed(2) + " € validé ! Merci pour votre achat chez 3iL Gaming.");
      this.contenuPanier.set([]); 
    });
  }
}