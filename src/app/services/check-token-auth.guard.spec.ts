import { TestBed } from '@angular/core/testing';

import { CheckTokenAuthGuard } from './check-token-auth.guard';

describe('CheckTokenAuthGuard', () => {
  let guard: CheckTokenAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckTokenAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
