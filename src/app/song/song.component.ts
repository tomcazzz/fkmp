import { Component, OnInit } from '@angular/core';
import { Song } from '../classes/song';
import { SongsDataService } from '../services/songs-data.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingState } from '../services/routingstate.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  song: Song;
  previousRoute: string;

  constructor(
    private fkSongsDS: SongsDataService,
    private route: ActivatedRoute,
    private routingState: RoutingState) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.song = this.fkSongsDS.getSingle(params['id']);
    this.previousRoute = this.routingState.getPreviousUrl();
    console.log("BreadCrumb: " + this.routingState.getCurrentURL());
    console.log("this.previousRoute: " + this.previousRoute);
  }
}
