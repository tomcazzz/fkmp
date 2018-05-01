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
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.bands = this.fkBandsDS.getAll();
  }

  removeBand(id: number) {
    let lOK:boolean = false;

    console.log("ID der zu löschenden Band: " + id);
    if (confirm('Band wirklich löschen?')) {
      lOK = this.fkBandsDS.removeBand(id);
      console.log("lOK: " + lOK);
      
      if(lOK)
      {
        this.showPositiveDeleteAlert = !this.showPositiveDeleteAlert;
        setTimeout(() => {
          this.showPositiveDeleteAlert = !this.showPositiveDeleteAlert;
        }, 3000);
      }
    }
    //this.router.navigate(['./'], { relativeTo: this.route });
  }
}

