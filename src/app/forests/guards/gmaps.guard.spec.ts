import { TestBed, async, inject } from '@angular/core/testing';

import { GmapsGuard } from './gmaps.guard';

describe('GmapsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GmapsGuard]
    });
  });

  it('should ...', inject([GmapsGuard], (guard: GmapsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
