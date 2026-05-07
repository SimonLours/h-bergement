import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteNom } from './carte-nom';

describe('CarteNom', () => {
  let component: CarteNom;
  let fixture: ComponentFixture<CarteNom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteNom],
    }).compileComponents();

    fixture = TestBed.createComponent(CarteNom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
