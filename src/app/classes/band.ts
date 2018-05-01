import {Project} from "./project"

export class Band {
    static counter: number = 0;
    id: number;
    title: string;
    city: string;
    projects: Project[];

    constructor(title: string, city: string, projects?: Project[]) {
        this.id = ++Band.counter;
        this.title = title;
        this.city = city;
        this.projects = projects;
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
