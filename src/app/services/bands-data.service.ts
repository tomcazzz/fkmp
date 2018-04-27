import { Injectable } from '@angular/core';
import { Band } from "../classes/band"
import { ProjectsDataService } from './projects-data.service';

@Injectable()
export class BandsDataService {
  bands: Band[];

  constructor(private fkProjectsDS: ProjectsDataService) { 
    console.log("BandsDataService: get Bands Data")

    this.bands = [
      new Band(1,"Tortuga",fkProjectsDS.getBandProjects(1)),
      new Band(2,"Telemotor",fkProjectsDS.getBandProjects(2)),
      new Band(3,"Rosenhain",fkProjectsDS.getBandProjects(3))
    ];
  }

  // Gibt alle Bands zurück
  getAll() {
    return this.bands;
  }

  // Gibt die Band mit dem Namen title zurück
  getSingle(id: number) {
    return this.bands.find(band => band.id == id);
  }

  addBand(newBand: Band) {
    if(this.bands.filter(band => band.title == newBand.title))
    {
      console.log("Band mit gleichem Name existiert bereits!")
      return;
    }
    this.bands.push(newBand);
    console.log("Band " + newBand.title + " added");
  }
}
