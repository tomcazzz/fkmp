import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BandsDataService } from '../services/bands-data.service';
import { Band } from '../classes/band';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-bandform',
  templateUrl: './bandform.component.html',
  styleUrls: ['./bandform.component.css']
})
export class BandformComponent implements OnInit, AfterViewInit {
  @ViewChild('bandForm') bandForm: NgForm;
  @ViewChild('collapsible') collapsible: ElementRef;
  @ViewChild('addButton') addButton: ElementRef;
  @ViewChild('pageTitle') pageTitle: ElementRef;

  band: Band;
  private lEditMode: boolean = false;
  private addShowPositiveAlert: boolean = false;
  private addShowNegativeAlert: boolean = false;
  private editShowPositiveAlert: boolean = false;
  private editShowNegativeAlert: boolean = false;

  constructor(
    private fkBandsDS: BandsDataService,
    private router: Router,
    private route: ActivatedRoute) 
  { }

  submitData(value: any) {
    if(this.lEditMode)
    {
      this.editShowPositiveAlert = this.fkBandsDS.editBand(this.band.id, new Band(value.title, value.city));
      this.editShowNegativeAlert = !this.editShowPositiveAlert

      setTimeout(() => {
        this.editShowPositiveAlert = false; 
        this.editShowNegativeAlert = false;
        
        /* reset darf hier nicht durchgeführt werden, weil ein Multibinding existiert.
        ein reset würde nicht nur die Form-Elemente löschen, sondern auch letztlich die Werte, die für den Array-
        Wert geschrieben werden sollen.
        this.bandForm.reset();
        */

        this.router.navigate(['../../../bands'],{ relativeTo: this.route });

      }, 3000);
    }
    else {
      this.addShowPositiveAlert = this.fkBandsDS.addBand(new Band(value.title, value.city));
      this.addShowNegativeAlert = !this.addShowPositiveAlert;

      setTimeout(() => {
        this.addShowPositiveAlert = false; 
        this.addShowNegativeAlert = false;
        this.bandForm.reset();

        // Access DOM element (collapsible DIV) and collapse it
        this.collapsible.nativeElement.className = "collapse";
      }, 3000);
    }
  }

  closeForm() {
    if(this.lEditMode) {
      this.router.navigate(['../../../bands'],{ relativeTo: this.route });  
    }  
    else {
      this.bandForm.reset();

      // Access DOM element (collapsible DIV) and collapse it
      this.collapsible.nativeElement.className = "collapse"; 
    }
  }

  ngOnInit() {
    const data = this.route.snapshot.data;

    if(data['band']) {
      this.band = data['band'];
      this.lEditMode = true;
    }
    else {
      this.band = new Band("","");
    }
  }

  ngAfterViewInit() {
    // Wurde die Komponente mit ID aufgerufen? -> Dann soll die Band mit der ID id bearbeitet werden
    if(this.lEditMode)
    {
      //  Button verstecken
      this.addButton.nativeElement.style="display: none;"

      // Titel anpassen
      this.pageTitle.nativeElement.textContent="Band editieren"

      // Collapsible DIV ausklappen
      this.collapsible.nativeElement.className = "collapse.show";
    }
  }
}
