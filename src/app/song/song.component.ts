import { Component, OnInit } from '@angular/core';
import { Song } from '../classes/song';
import { SongsDataService } from '../services/songs-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  song: Song;

  constructor(
    private fkSongsDS: SongsDataService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    console.log("params['id']: " + params['id']);
    this.song = this.fkSongsDS.getSingle(params['id']);
  }
}
