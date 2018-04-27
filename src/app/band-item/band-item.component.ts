// Diese Klasse wird nur für die Anzeige in der Bandliste benötigt.
// Wichtig hier ist der umbenannte Selektor, der auf das HTML a gemünzt wurde, um aus der Bandliste heraus
// die Band nach unten weiterreichen zu können.
import { Component, OnInit, Input } from '@angular/core';
import { Band } from '../classes/band';

@Component({
  selector: 'a.band-item',
  templateUrl: './band-item.component.html',
  styleUrls: ['./band-item.component.css']
})
export class BandItemComponent implements OnInit {
  @Input() band: Band;
  
  constructor() { }

  ngOnInit() {
  }
}
