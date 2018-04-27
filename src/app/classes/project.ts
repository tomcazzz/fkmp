import {Song} from "./song"

export class Project {
    id: number;
    bandid: number;
    title: string;
    songs: Song[];

    constructor(id: number, bandid: number, title: string, songs?: Song[]) {
        this.id = id;
        this.bandid = bandid;
        this.title = title;
        this.songs = songs;
    }

    GetNOfSongs() {
        return this.songs ? this.songs.length : 0;
    }
}
