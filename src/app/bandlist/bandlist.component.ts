import { Component, OnInit } from '@angular/core';
import { Band } from "../classes/band"
import { BandsDataService } from "../services/bands-data.service";

@Component({
  selector: 'app-bandlist',
  templateUrl: './bandlist.component.html',
  styleUrls: ['./bandlist.component.css']
})

export class BandlistComponent implements OnInit {
  bands: Band[];

  constructor(private fkBandsDS: BandsDataService) { }

  ngOnInit() {
    this.bands = this.fkBandsDS.getAll();
  }

}
