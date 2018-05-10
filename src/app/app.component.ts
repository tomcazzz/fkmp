import { Component } from '@angular/core';
import { RoutingstateService } from './services/routingstate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(routingState: RoutingstateService) {
    routingState.loadRouting();
  }
}
