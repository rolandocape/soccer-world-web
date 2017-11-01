import { TestBed, inject } from '@angular/core/testing';

import { RoundMatchesService } from './round-matches.service';

describe('RoundMatchesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoundMatchesService]
    });
  });

  it('should be created', inject([RoundMatchesService], (service: RoundMatchesService) => {
    expect(service).toBeTruthy();
  }));
});
