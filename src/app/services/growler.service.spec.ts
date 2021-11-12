import { TestBed } from '@angular/core/testing';

import { GrowlerService } from './growler.service';

describe('GrowlerService', () => {
  let service: GrowlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrowlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
