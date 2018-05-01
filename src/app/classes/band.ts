import {Project} from "./project"

export class Band {
    static counter: number = 0;
    id: number;
    title: string;
    projects: Project[];

    constructor(title: string, projects?: Project[]) {
        this.id = ++Band.counter;
        this.title = title;
        this.projects = projects;

        //console.log("Projects Länge: " + this.projects.length);
    }

    GetNOfProjects() {
        return this.projects ? this.projects.length : 0;
    }

    GetNOfSongs() {
        let nSum = 0;
        if(this.projects) {
            for(let i=0; i<this.projects.length; i++) {
                nSum += this.projects[i].GetNOfSongs();
            }
        }
        return nSum;
    }
}
