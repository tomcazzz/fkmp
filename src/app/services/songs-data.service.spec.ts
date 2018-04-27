import { TestBed, inject } from '@angular/core/testing';

import { SongsDataService } from './songs-data.service';

describe('SongsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SongsDataService]
    });
  });

  it('should be created', inject([SongsDataService], (service: SongsDataService) => {
    expect(service).toBeTruthy();
  }));
});
