import { TestBed } from '@angular/core/testing';

import { Imadmin.GuardService } from './imadmin.guard.service';

describe('Imadmin.GuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Imadmin.GuardService = TestBed.get(Imadmin.GuardService);
    expect(service).toBeTruthy();
  });
});
