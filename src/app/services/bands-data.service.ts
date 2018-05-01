import { Injectable } from '@angular/core';
import { Band } from "../classes/band"
import { ProjectsDataService } from './projects-data.service';

@Injectable()
export class BandsDataService {
  bands: Band[];

  constructor(private fkProjectsDS: ProjectsDataService) { 
    console.log("BandsDataService: get Bands Data")

    this.bands = [
      new Band("Tortuga",fkProjectsDS.getBandProjects(1)),
      new Band("Telemotor",fkProjectsDS.getBandProjects(2)),
      new Band("Rosenhain",fkProjectsDS.getBandProjects(3))
    ];
  }

  // Gibt alle Bands zurück
  getAll() {
    return this.bands;
  }

  // Gibt die Band mit der ID id zurück
  getSingle(id: number) {
    return this.bands.find(band => band.id == id);
  }

  addBand(newBand: Band) {
    let retValue: boolean = true;

    if(this.bands.find(band => band.title === newBand.title))
    {
      retValue = false;
    }
    else 
    {
      this.bands.push(newBand);
    }
    return retValue;
  }

  removeBand(id: number) {
    let retValue: boolean = true;
    let bandsLength: number = this.bands.length;
    console.log("Bands DataService. ID: " + id + "; Anzahl Bands: " + this.bands.length);
    this.bands = this.bands.filter(band => band.id != id);
    if(this.bands.length !== bandsLength - 1) 
      retValue = false;
    //if(this.bands.splice(this.bands.indexOf(this.bands[id]),1))
    console.log("Anzahl Bands: " + this.bands.length);

    return retValue;
  }
}
