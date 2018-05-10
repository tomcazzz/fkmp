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
import { HeaderComponent } from './header/header.component';
import { RoutingstateService } from './services/routingstate.service';
import { BandeditComponent } from './bandedit/bandedit.component';
import { BandResolverService } from './services/band-resolver.service';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './classes/jwtinterceptor';
import { fakeBackendProvider } from './classes/fakebandendinterceptor';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';


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
    BandformComponent,
    HeaderComponent,
    BandeditComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DateValueAccessorModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    BandsDataService,
    ProjectsDataService,
    SongsDataService,
    RoutingstateService,
    BandResolverService,
    AlertService,
    UserService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },,
    AuthenticationService,
    AuthGuard,

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
