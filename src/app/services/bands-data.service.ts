import { Injectable } from '@angular/core';
import { Band } from "../classes/band"
import { ProjectsDataService } from './projects-data.service';
import { HttpClient } from '@angular/common/http';
import { retry, map, catchError } from 'rxjs/operators';
import { BandRaw } from '../classes/bandraw';
import { BandFactory } from '../classes/bandfactory';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BandsDataService {
  private api: string = "http://www.findelkind-records.de/api/";
  //bands: Band[];

  constructor(private fkProjectsDS: ProjectsDataService, private http: HttpClient) { 
    //console.log("BandsDataService:Constructor");
    /*
    this.bands = [
      new Band("Tortuga","Augsburg",fkProjectsDS.getBandProjects(1)),
      new Band("Telemotor","Augsburg",fkProjectsDS.getBandProjects(2)),
      new Band("Rosenhain","Augsburg",fkProjectsDS.getBandProjects(3))
    ];
    */
  }

  // Gibt alle Bands zurück
  getAll(): Observable<Array<Band>> {
    const params = "bands/";

    return this.http.get<BandRaw[]>(this.api + params)
            .pipe(
              retry(3),
              map(rawBands => rawBands // Observable.map!
                .map(rawBand => BandFactory.newBand(rawBand) // Array.map!
                ),
              ),             
              catchError(this.errorHandler)
            );
  }

  // Gibt die Band mit der ID id zurück
  getSingle(id: number): Observable<Band> {
    const params = "band/"+id;

    return this.http.get<BandRaw>(this.api + params)
            .pipe(
              retry(3),
              map(rawBand => BandFactory.newBand(rawBand)),
              catchError(this.errorHandler)
            );
  }


  addBand(newBand: Band): Observable<any> {
    const params = "band/";

    return this.http.post(this.api + params,JSON.stringify(newBand))
            .pipe(
              map(response => {
                console.log("response[status]: " + response['status']);
                console.log("response[status_message]: " + response['status_message']);
                console.log("response[data]: " + response['data']);
              }),
              catchError(this.errorHandler),           
            );
  }
  
  editBand(id: number, updateBand: Band) {
    let retValue: boolean = true;
   /*
    try {
      this.bands[this.bands.findIndex(band => band.id === id)].title = updateBand.title;
      this.bands[this.bands.findIndex(band => band.id === id)].city = updateBand.city;
    }
    catch(err) {
      console.log(err.message);
      retValue = false;
    }
    finally 
        */{
      return retValue;
    }

  }

  removeBand(id: number) {
    let retValue: boolean = true;
        /*
    let bandsLength: number = this.bands.length;

    this.bands = this.bands.filter(band => band.id != id);
    if(this.bands.length !== bandsLength - 1) 
      retValue = false;
    */
    return retValue;

  }
  
  private errorHandler(error: Error | any): Observable<any> {
    console.log("BandsDataService: HTTP ERROR");
    return Observable.throw(error);
  }
}
