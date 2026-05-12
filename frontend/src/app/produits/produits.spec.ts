import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Produits } from './produits';

// Fichier de test généré par défaut par Angular
describe('Produits', () => {
  let component: Produits;
  let fixture: ComponentFixture<Produits>;

  // Configuration de l'environnement de test avant chaque exécution
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Produits],
    }).compileComponents();

    fixture = TestBed.createComponent(Produits);
    component = fixture.componentInstance; // Instanciation de notre composant
    await fixture.whenStable();
  });

  // Test basique : vérifie que le composant réussit à se créer sans erreur
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});