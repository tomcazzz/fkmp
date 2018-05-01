import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BandsDataService } from '../services/bands-data.service';
import { Band } from '../classes/band';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bandform',
  templateUrl: './bandform.component.html',
  styleUrls: ['./bandform.component.css']
})
export class BandformComponent implements AfterViewInit {
  @ViewChild('bandForm') bandForm: NgForm;
  @ViewChild('collapsible') collapsible: ElementRef;
  @ViewChild('addButton') addButton: ElementRef;
  @ViewChild('pageTitle') pageTitle: ElementRef;
  
  band: Band = new Band("Test");
  private addShowPositiveAlert: boolean = false;
  private addShowNegativeAlert: boolean = false;

  addBandData(value: any) {
    this.addShowPositiveAlert = this.fkBandsDS.addBand(new Band(value.bandname));
    this.addShowNegativeAlert = !this.addShowPositiveAlert;

    setTimeout(() => {
      this.addShowPositiveAlert = false; 
      this.addShowNegativeAlert = false;
      this.bandForm.reset();

      // Access DOM element (collapsible DIV) and collapse it
      this.collapsible.nativeElement.className = "collapse";
    }, 3000);
  }

  addBand(band: Band) {
    this.fkBandsDS.addBand(band);
  }

  constructor(
    private fkBandsDS: BandsDataService,
    private route: ActivatedRoute) { }

  ngAfterViewInit() {
    const params = this.route.snapshot.params;
    const data = this.route.snapshot.data;
    //this.band = data['band'];

    console.log("Active Route Data: " + data['band']);
    console.log("Selected Band ID: " + params['id']);

    // Wurde die Komponente mit ID aufgerufen? -> Dann soll die Band mit der ID id bearbeitet werden
    if(params['id'] && params['id'] != "")
    {
      console.log("Bandtitel: " + this.band.title); 

      //  Button verstecken
      this.addButton.nativeElement.style="display: none;"

      // Titel anpassen
      this.pageTitle.nativeElement.textContent="Band editieren"

      // Collapsible DIV ausklappen
      this.collapsible.nativeElement.className = "collapse.show";
    }
    else {
      // Band leer anlegen für Form im Template
      //this.band = new Band('');
    }
  }

}
