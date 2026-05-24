import { TestBed } from '@angular/core/testing';

import { Swift } from './swift';

describe('Swift', () => {
  let service: Swift;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Swift);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
