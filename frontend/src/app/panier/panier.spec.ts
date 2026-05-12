import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Panier } from './panier';

// Fichier de tests unitaires généré par la CLI Angular
describe('Panier', () => {
  let component: Panier;
  let fixture: ComponentFixture<Panier>;

  // Initialisation et configuration du module de test avant chaque vérification
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Panier],
    }).compileComponents();

    fixture = TestBed.createComponent(Panier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  // Test basique de validation : s'assure que le composant Panier se construit sans erreur
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});