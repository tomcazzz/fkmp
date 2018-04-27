import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BandlistComponent} from './bandlist/bandlist.component';
import {ProjectlistComponent} from './projectlist/projectlist.component';
import {UserlistComponent} from './userlist/userlist.component';
import { BandComponent } from './band/band.component';
import { ProjectComponent } from './project/project.component';
import { SongComponent } from './song/song.component';
import { SonglistComponent } from './songlist/songlist.component';
import { ContactComponent } from './contact/contact.component';
import { ImprintComponent } from './imprint/imprint.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'bands', component: BandlistComponent},
    {path: 'bands/:id', component: BandComponent},
    {path: 'bands/:id/:id', component: ProjectComponent},
    {path: 'bands/:id/:id/:id', component: SongComponent},
    {path: 'projects', component: ProjectlistComponent},
    {path: 'projects/:id', component: ProjectComponent},
    {path: 'projects/:id/:id', component: SongComponent},
    {path: 'songs', component: SonglistComponent},
    {path: 'songs/:id', component: SongComponent},
    {path: 'users', component: UserlistComponent},
    {path: 'contact', component: ContactComponent},    
    {path: 'imprint', component: ImprintComponent},
    {path: 'disclaimer', component: DisclaimerComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {};