import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public responsiveTopNavVisible: boolean = false;
  isLoggedIn$: Observable<boolean>; 

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }

  showResponsiveMenu() {
    this.responsiveTopNavVisible = !this.responsiveTopNavVisible;
  }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    console.log("Abmelden");
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
