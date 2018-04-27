// Diese Klasse wird nur für die Anzeige in der Songlist benötigt.
// Wichtig hier ist der umbenannte Selektor, der auf das HTML a gemünzt wurde, um aus der Songliste heraus
// den Song nach unten weiterreichen zu können.
import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../classes/project';

@Component({
  selector: 'a.project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  @Input() project: Project;
  
  constructor() { }

  ngOnInit() {
  }

}
