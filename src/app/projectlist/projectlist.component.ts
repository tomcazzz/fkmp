import { Component, OnInit } from '@angular/core';
import { Project } from '../classes/project';
import { ProjectsDataService } from '../services/projects-data.service';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})

export class ProjectlistComponent implements OnInit {
  projects: Project[];

  constructor(private fkProjectsDS: ProjectsDataService) { }

  ngOnInit() {
    this.projects = this.fkProjectsDS.getAll();
  }
}
