import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common'; // Outil pour bien formater l'affichage des prix

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './panier.html',
  styleUrl: './panier.css'
})
export class Panier implements OnInit {
  // Signal réactif pour stocker les articles ajoutés au panier
  contenuPanier = signal<any[]>([]);
  
  // 'computed' est super utile ici : il recalcule le total automatiquement à chaque fois que contenuPanier change
  total = computed(() => {
    return this.contenuPanier().reduce((somme, item) => somme + (item.prix * item.quantite), 0);
  });
  
  // Injection du service HTTP pour communiquer avec notre API
  http = inject(HttpClient);

  ngOnInit() {
    // Récupération initiale du panier depuis la base de données via notre API
    this.http.get<any[]>('/api/panier').subscribe(donnees => {
        this.contenuPanier.set(donnees);
    });
  }

  supprimer(id: string) {
    // 1. On demande au Backend de supprimer le document dans MongoDB
    this.http.delete('/api/panier/' + id).subscribe(() => {
      // 2. On met à jour l'affichage en direct (sans recharger la page) en filtrant la liste locale
      const nouvelleListe = this.contenuPanier().filter(article => article._id !== id);
      this.contenuPanier.set(nouvelleListe);
    });
  }

  payer() {
    if (this.total() === 0) return; // Sécurité : on empêche le paiement d'un panier vide
    
    // On appelle la route de l'API qui supprime tout le contenu de la collection Panier
    this.http.delete('/api/panier').subscribe(() => {
      alert("🎉 Paiement de " + this.total().toFixed(2) + " € validé ! Merci pour votre achat chez 3iL Gaming.");
      this.contenuPanier.set([]); // On vide l'affichage du panier côté Frontend
    });
  }
}