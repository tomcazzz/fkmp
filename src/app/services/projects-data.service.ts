import { Injectable } from '@angular/core';
import { Project } from '../classes/project';
import { SongsDataService } from './songs-data.service';
import { BandsDataService } from './bands-data.service';

@Injectable()
export class ProjectsDataService {
  projects: Project[];

  constructor(
    private fkSongsDS: SongsDataService,
    //private fkBandsDS: BandsDataService
  ) { 
    console.log("ProjectsDataService: get Project Data")
    
    this.projects = [
      new Project(1,1,"Nothing Is Like It Seems To Be",this.fkSongsDS.getProjectSongs(1)),
      new Project(2,1,"No(o)ne Good Friend",this.fkSongsDS.getProjectSongs(2)),
      new Project(3,1,"Virginia Hill",this.fkSongsDS.getProjectSongs(3)),
      new Project(4,2,"Telemotor 1"),
      new Project(5,2,"Telemotor 2"),
      new Project(6,3,"Best Songs"),
    ];
  
    console.log("project title: " + this.projects[0].title)
  }

  getAll() {
    return this.projects;  
  }

    // Gibt das Project mit der ID id zurück
    getSingle(id: number) {
      console.log("Project.getSingle. ID: " + id);
      return this.projects.find(project => project.id == id);
    }

  getBandProjects(bandid: number) 
  {
    function isOfBand(element) 
    {
      return (element.bandid == this); 
    } 

    return this.projects.filter(isOfBand, bandid);
  }
  /* Zirkelbezug
  getProjectBand(projectid: number) {
    return this.fkBandsDS.getSingle(this.projects[projectid].bandid);
  }
  */
}
