import { TestBed } from '@angular/core/testing';

import { OppositeAuthGuard } from './opposite-auth.guard';

describe('OppositeAuthGuard', () => {
  let guard: OppositeAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OppositeAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
