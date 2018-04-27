import { Injectable } from '@angular/core';
import { Song } from '../classes/song';

@Injectable()
export class SongsDataService {
  songs: Song[];

  constructor() { 
    console.log("SongsDataService: get Songs Data")

    this.songs = [
      new Song(1,1,"Groundlicker",6),
      new Song(2,1,"Arturo's Jazz Bar",6),
      new Song(3,2,"Burrito",6),
      new Song(4,2,"Day by Day",6),
      new Song(5,2,"No Good Friend",6),
      new Song(6,3,"Manito",3),
      new Song(7,3,"A New Hope",2),
      new Song(8,3,"Anne",2),
      new Song(9,3,"Devil",4)
    ];

    console.log("SongsDS Constructor. Songs: " + this.songs.length);
  }

  // Gibt alle Bands zurück
  getAll() {
    return this.songs;
  }

  // Gibt den Song mit der ID id zurück
  getSingle(id: number) {
    console.log("Songs getSingle. ID: " + id);
    return this.songs.find(song => song.id == id);
  }

  getProjectSongs(projectid: number) 
  {
    console.log("projectid: " + projectid);
    function isOfProject(element) 
    {
      return (element.projectid == this); 
    } 

    return this.songs.filter(isOfProject, projectid);
  }
}
