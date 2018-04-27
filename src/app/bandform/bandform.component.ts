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
  //@ViewChild('form') form: NgForm;
  sendBandData(value: any) {
    console.log(value);
    console.log(value.bandname);
    this.fkBandsDS.addBand(new Band(5,value.bandname));

  }
  constructor(private fkBandsDS: BandsDataService) { }

  ngOnInit() {
    
  }

}
