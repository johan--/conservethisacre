import { TestBed, inject } from '@angular/core/testing';

import { ForestService } from './forest.service';

describe('ForestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForestService]
    });
  });

  it('should be created', inject([ForestService], (service: ForestService) => {
    expect(service).toBeTruthy();
  }));
});
