import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteNom } from './carte-nom';

// Test unitaire de base du composant CarteNom
describe('CarteNom', () => {
  let component: CarteNom;
  let fixture: ComponentFixture<CarteNom>;

  // Préparation de l'environnement virtuel pour tester le composant isolé
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteNom],
    }).compileComponents();

    fixture = TestBed.createComponent(CarteNom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  // S'assure que le composant est capable d'être instancié dans l'application
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});