import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Punto3 } from './punto3';

describe('Punto3', () => {

  let component: Punto3;
  let fixture: ComponentFixture<Punto3>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [Punto3],
    }).compileComponents();

    fixture = TestBed.createComponent(Punto3);

    component = fixture.componentInstance;

    await fixture.whenStable();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('debe iniciar con 10 intentos', () => {

    expect(component.intentos).toBe(10);

  });

  it('debe crear 12 cartas', () => {

    component.iniciarJuego();

    expect(component.cartas.length).toBe(12);

  });

});