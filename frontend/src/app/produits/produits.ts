import { Component, OnInit, inject, signal } from '@angular/core'; 
import { CarteNom } from '../carte-nom/carte-nom';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CarteNom],
  templateUrl: './produits.html',
  styleUrl: './produits.css'
})
export class Produits implements OnInit {
  
  mesCartes = signal<any[]>([]); 
  
  http = inject(HttpClient); 

  ngOnInit() {
    // 🔴 CORRECTION : On utilise l'URL relative au lieu de l'IP
    this.http.get<any[]>('/api/produits')
      .subscribe(donnees => {
        this.mesCartes.set(donnees);
      });
  }
}