import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginData: any = {};
  loading:boolean = false;
  returnURL: string = '/dashboard';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {

   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [this.loginData.username],
      password: [this.loginData.password]
    })
  }

  submitLoginForm() {
    console.log("this.loginForm.value.username: " + this.loginForm.value.username);
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(
            data => {
                this.router.navigate([this.returnURL]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }

}
