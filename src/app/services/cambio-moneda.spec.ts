import { TestBed } from '@angular/core/testing';

import { CambioMoneda } from './cambio-moneda';

describe('CambioMoneda', () => {
  let service: CambioMoneda;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambioMoneda);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
