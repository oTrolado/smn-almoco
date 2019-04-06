import { TestBed } from '@angular/core/testing';

import { TrocaService } from './troca.service';

describe('TrocaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrocaService = TestBed.get(TrocaService);
    expect(service).toBeTruthy();
  });
});
