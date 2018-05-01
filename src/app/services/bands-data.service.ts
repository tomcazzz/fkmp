import { Injectable } from '@angular/core';
import { Band } from "../classes/band"
import { ProjectsDataService } from './projects-data.service';

@Injectable()
export class BandsDataService {
  bands: Band[];

  constructor(private fkProjectsDS: ProjectsDataService) { 
    //console.log("BandsDataService:Constructor");

    this.bands = [
      new Band("Tortuga","Augsburg",fkProjectsDS.getBandProjects(1)),
      new Band("Telemotor","Augsburg",fkProjectsDS.getBandProjects(2)),
      new Band("Rosenhain","Augsburg",fkProjectsDS.getBandProjects(3))
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

  editBand(id: number, updateBand: Band) {
    let retValue: boolean = true;

    try {
      this.bands[this.bands.findIndex(band => band.id === id)].title = updateBand.title;
      this.bands[this.bands.findIndex(band => band.id === id)].city = updateBand.city;
    }
    catch(err) {
      console.log(err.message);
      retValue = false;
    }
    finally {
      return retValue;
    }
  }

  removeBand(id: number) {
    let retValue: boolean = true;
    let bandsLength: number = this.bands.length;

    this.bands = this.bands.filter(band => band.id != id);
    if(this.bands.length !== bandsLength - 1) 
      retValue = false;

    return retValue;
  }
}
