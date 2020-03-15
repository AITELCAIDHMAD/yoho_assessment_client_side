import { Injectable } from '@angular/core';
import 'rxjs/Rx'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class DashboardService {
    private jwtToken: string;
    constructor(private http: HttpClient) { }

    loadToken() {
        this.jwtToken
            = localStorage.getItem('token');
        return this.jwtToken;
    }




    getReport1(date) {
        this.loadToken();
        const headers
            = new HttpHeaders();
        headers.append('authorization', this.jwtToken);
        return this.http.get('/api/report/data1/' + date, {
            headers: new
                HttpHeaders({ 'authorization': this.jwtToken })
        });
    }

    getReport2(date) {
        this.loadToken();
        const headers
            = new HttpHeaders();
        headers.append('authorization', this.jwtToken);
        return this.http.get('/api/report/data2/' + date, {
            headers: new
                HttpHeaders({ 'authorization': this.jwtToken })
        });
    }


    getReport3(date) {
        this.loadToken();
        const headers
            = new HttpHeaders();
        headers.append('authorization', this.jwtToken);
        return this.http.get('/api/report/data3/' + date, {
            headers: new
                HttpHeaders({ 'authorization': this.jwtToken })
        });
    }

}
