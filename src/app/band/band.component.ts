import { Component, OnInit, Input } from '@angular/core';
import { Band } from '../classes/band';
import { BandsDataService } from '../services/bands-data.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../classes/project';
import { ProjectsDataService } from '../services/projects-data.service';

@Component({
  selector: 'app_band',
  templateUrl: './band.component.html',
  styleUrls: ['./band.component.css']
})

export class BandComponent implements OnInit {
  band: Band;
  projects: Project[];

  constructor(
    private fkBandDS: BandsDataService,
    private fkProjectsDS: ProjectsDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.fkBandDS.getSingle(params['id']).subscribe((band: Band) => this.band = band);
    this.projects = this.fkProjectsDS.getBandProjects(params['id']);
  }
}
