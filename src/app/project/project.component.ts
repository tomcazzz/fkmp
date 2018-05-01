import { Component, OnInit } from '@angular/core';
import { Song } from '../classes/song';
import { SongsDataService } from '../services/songs-data.service';
import { Project } from '../classes/project';
import { ProjectsDataService } from '../services/projects-data.service';
import { ActivatedRoute } from '@angular/router';
import { Band } from '../classes/band';
import { RoutingState } from '../services/routingstate.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project: Project;
  songs: Song[];
  previousRoute: string;
  
  constructor(
    private fkProjectsDS: ProjectsDataService,
    private fkSongsDS: SongsDataService,
    private route: ActivatedRoute,
    private routingState: RoutingState
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.project = this.fkProjectsDS.getSingle(params['id']);
    this.songs = this.fkSongsDS.getProjectSongs(params['id']);
    this.previousRoute = this.routingState.getPreviousUrl();
    console.log("this.previousRoute: " + this.previousRoute);
    console.log("BreadCrumb: " + this.routingState.getCurrentURL());
    console.log("History-Array: " + this.routingState.getHistory().toString());
  }
}
