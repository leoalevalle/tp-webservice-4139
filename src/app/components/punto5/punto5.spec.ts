import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Punto5 } from './punto5';

describe('Punto5', () => {
  let component: Punto5;
  let fixture: ComponentFixture<Punto5>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Punto5],
    }).compileComponents();

    fixture = TestBed.createComponent(Punto5);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
