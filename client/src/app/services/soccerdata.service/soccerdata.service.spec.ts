import { TestBed, inject } from '@angular/core/testing';

import { SoccerdataService } from './soccerdata.service';

describe('SoccerdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoccerdataService]
    });
  });

  it('should be created', inject([SoccerdataService], (service: SoccerdataService) => {
    expect(service).toBeTruthy();
  }));
});
