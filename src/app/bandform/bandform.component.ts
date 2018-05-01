import { Component, OnInit, ViewChild } from '@angular/core';
import { BandsDataService } from '../services/bands-data.service';
import { Band } from '../classes/band';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bandform',
  templateUrl: './bandform.component.html',
  styleUrls: ['./bandform.component.css']
})
export class BandformComponent implements OnInit {
  private showBandAddForm: boolean = true;
  private showPositiveAlert: boolean = false;
  private showNegativeAlert: boolean = false;

  @ViewChild('form') form: NgForm;
  addBandData(value: any) {
    this.showPositiveAlert = this.fkBandsDS.addBand(new Band(value.bandname));
    this.showNegativeAlert = !this.showPositiveAlert;

    setTimeout(() => {
      this.showPositiveAlert = false; 
      this.showNegativeAlert = false;
      this.form.reset();
      this.showBandAddForm = false;
    }, 3000);
  }

  addBand(band: Band) {
    this.fkBandsDS.addBand(band);
  }

  constructor(private fkBandsDS: BandsDataService) { }

  ngOnInit() {
    this.showBandAddForm = true;  
  }

}
