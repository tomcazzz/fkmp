export class Song {
    id: number;
    projectid: number;
    title: string;
    status: number;
    //milestones: Milestone[];

    constructor(id: number, projectid: number, title: string, status: number) {
        this.id = id;
        this.projectid = projectid;
        this.title = title;
        this.status = status;
    }
}
