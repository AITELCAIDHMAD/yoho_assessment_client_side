import { Injectable } from '@angular/core';
import 'rxjs/Rx'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class AuthenticationService {

    private jwtToken: string;
    private roles: Array<any> = [];
    HOST = "https://yoho-backend.herokuapp.com";
    constructor(private http: HttpClient) { }
    login(user) {
        return this.http.post(this.HOST + '/login', user, {
            observe: 'response'
        });
    }

    saveToken(jwtToken) {
        this.jwtToken = jwtToken;
        localStorage.setItem('token', jwtToken);
        const jwtHelper
            = new JwtHelper();
        this.roles
            = jwtHelper.decodeToken(this.jwtToken).roles;
    }
    loadToken() {
        this.jwtToken
            = localStorage.getItem('token');
        return this.jwtToken;
    }
    logOut() {
        localStorage.removeItem('token');
    }
    isAdmin() {
        for (const r of this.roles) {
            if (r.authority === 'ADMIN') { return true; }
        }
        return false;
    }
}
