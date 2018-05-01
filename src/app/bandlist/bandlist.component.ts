import { Component, OnInit } from '@angular/core';
import { Band } from "../classes/band"
import { BandsDataService } from "../services/bands-data.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bandlist',
  templateUrl: './bandlist.component.html',
  styleUrls: ['./bandlist.component.css']
})

export class BandlistComponent implements OnInit {
  public bands: Band[];
  private showPositiveDeleteAlert: boolean = false;

  constructor(
    private fkBandsDS: BandsDataService,
    private router: Router,
    private route: ActivatedRoute ) { 
      //console.log("BandList:Constructor");
    }

  ngOnInit() {
    this.bands = this.fkBandsDS.getAll();
  }

  removeBand(id: number) {
    let lOK:boolean = false;

    if (confirm('Band wirklich löschen?')) {
      lOK = this.fkBandsDS.removeBand(id);
      
      if(lOK)
      {
        this.showPositiveDeleteAlert = !this.showPositiveDeleteAlert;
        setTimeout(() => {
          this.showPositiveDeleteAlert = !this.showPositiveDeleteAlert;
        }, 3000);
      }
    }
  }
}

