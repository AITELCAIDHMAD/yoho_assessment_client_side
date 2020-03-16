import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthenticationService,
    private router: Router) { }
  ngOnInit() {
    let token
      = this.authService.loadToken();
    if (token)
      this.router.navigateByUrl("/dashboard");
  }
  onLogin(formData) {
    this.authService.login(formData)
      .subscribe(resp => {
        let jwtToken = resp.headers.get('authorization');
        this.authService.saveToken(jwtToken);
        this.router.navigateByUrl("/dashboard");
      },
        err => {
          Swal.fire(
            'Error',
            'the username or password is incorrect',
            'error'
          );
        })
  }
}