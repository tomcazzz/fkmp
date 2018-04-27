import { TestBed, inject } from '@angular/core/testing';

import { BandsDataService } from './bands-data.service';

describe('BandsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BandsDataService]
    });
  });

  it('should be created', inject([BandsDataService], (service: BandsDataService) => {
    expect(service).toBeTruthy();
  }));
});
