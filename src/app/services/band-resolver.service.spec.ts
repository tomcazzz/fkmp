import { TestBed, inject } from '@angular/core/testing';

import { BandResolverService } from './band-resolver.service';

describe('BandResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BandResolverService]
    });
  });

  it('should be created', inject([BandResolverService], (service: BandResolverService) => {
    expect(service).toBeTruthy();
  }));
});
