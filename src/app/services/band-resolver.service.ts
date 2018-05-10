import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Band } from '../classes/band';
import { BandsDataService } from './bands-data.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BandResolverService implements Resolve<Band> {

  constructor(private fkBandsDS: BandsDataService) { }

  resolve(route: ActivatedRouteSnapshot): Band {
    //return this.fkBandsDS.getSingle(route.params['id']);
    // test:
    return new Band('','');
  }
}
