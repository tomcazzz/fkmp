import { Component } from '@angular/core';
import { RoutingState } from './services/routingstate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(routingState: RoutingState) {
    routingState.loadRouting();
  }
}
