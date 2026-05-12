import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accueil } from './accueil';

// Fichier de tests unitaires pour la page d'accueil
describe('Accueil', () => {
  let component: Accueil;
  let fixture: ComponentFixture<Accueil>;

  // Préparation de l'environnement de test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accueil],
    }).compileComponents();

    fixture = TestBed.createComponent(Accueil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  // Test de base : s'assure que la page d'accueil charge sans faire planter l'application
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});