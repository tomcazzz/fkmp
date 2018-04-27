import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { DateValueAccessorModule } from 'angular-date-value-accessor';

import { AppComponent } from './app.component';
import { FkComponent } from './fk/fk.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BandsDataService } from './services/bands-data.service';
import { BandComponent } from './band/band.component';
import { BandlistComponent } from './bandlist/bandlist.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ProjectsDataService } from './services/projects-data.service';
import { BandItemComponent } from './band-item/band-item.component';
import { SonglistComponent } from './songlist/songlist.component';
import { SongItemComponent } from './song-item/song-item.component';
import { SongComponent } from './song/song.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectComponent } from './project/project.component';
import { SongsDataService } from './services/songs-data.service';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { ImprintComponent } from './imprint/imprint.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { BandformComponent } from './bandform/bandform.component';


@NgModule({
  declarations: [
    AppComponent,
    FkComponent,
    DashboardComponent,
    BandComponent,
    BandlistComponent,
    ProjectlistComponent,
    UserlistComponent,
    BandItemComponent,
    SonglistComponent,
    SongItemComponent,
    SongComponent,
    ProjectItemComponent,
    ProjectComponent,
    BreadcrumbComponent,
    FooterComponent,
    ContactComponent,
    ImprintComponent,
    DisclaimerComponent,
    BandformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DateValueAccessorModule
  ],
  providers: [
    BandsDataService,
    ProjectsDataService,
    SongsDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
