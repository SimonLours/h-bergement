import { Component, OnInit, inject, signal } from '@angular/core'; // 1. On importe "signal"
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
    this.http.get<any[]>('https://91.134.36.203/api/produits')
      .subscribe(donnees => {
        this.mesCartes.set(donnees);
      });
  }
}