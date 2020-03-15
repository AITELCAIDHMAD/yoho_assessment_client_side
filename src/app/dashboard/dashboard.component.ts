import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import * as Chart from 'chart.js';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  defaultDate = '2018-01-07';
  dataList = [];
  data: Map<string, any> = new Map<string, []>();
  dateTimeFrom: string;
  dateTimeTo: string;
  canvas: any;
  ctx: any;
  lables = [];
  datasets = [];
  selectedDate: any;
  datePickerConfig = {
    format: 'YYYY-MM-DD'
  }

  dataNull = [];

  constructor(private router: Router, private dashboardService: DashboardService, private authenticationService: AuthenticationService) {

  }
  ngOnInit(): void {

    for (let i = 0; i < 24; i++) {
      this.lables.push('H' + i);
    }

    console.log('ngOnInit');

    this.getData1(this.defaultDate);



  }


  getData2(date) {
    this.dashboardService.getReport2(date).subscribe(resp => {

      console.log('the resp2 is ');
      console.log(resp);
      let data2: any = resp;

      for (const [key, value] of Object.entries(data2)) {

        console.log('boucle for 2')
        let color: any = value;

        this.data.get(key).color = color.split('/')[1];
      }
      console.log('this.data2 ')
      console.log(this.data);


      this.getData3(this.defaultDate);


    }, err => {


    });

  }


  getData3(date) {
    this.dashboardService.getReport3(date).subscribe(resp => {

      console.log('the resp3 is ');
      console.log(resp);

      let data3: any = resp;


      for (const item of data3) {
        console.log('boucle for 3')
        console.log(this.data.get(item.machine));

        this.data.get(item.machine)['performance'] = item.performance;
        this.data.get(item.machine)['availability'] = item.availability;
        this.data.get(item.machine)['quality'] = item.quality;
        this.data.get(item.machine)['oee'] = item.oee;
      }

      console.log('this.data3 ')
      console.log(this.data);

      this.dataList = Array.from(this.data.values());

    }, err => {


    });
  }


  getData1(date) {
    this.datasets = [];

    this.dashboardService.getReport1(date).subscribe(resp => {
      console.log('the resp1 is ');
      console.log(resp);

      let data1: any = resp;
      this.dateTimeFrom = data1[0].datetime_FROM;
      this.dateTimeTo = data1[0].datetime_TO;



      for (const item of data1) {
        this.data.set(item.machine, item);

        console.log(Object.values(item.listNetproductionPerHoure));
        let color1 = 0;
        let color2 = 0;
        let color3 = 0;

        while (color1 === color2 || color1 === color3 || color3 === color2) {
          color1 = Math.floor(Math.random() * 255) + 1;
          color2 = Math.floor(Math.random() * 255) + 1;
          color3 = Math.floor(Math.random() * 255) + 1;
        }


        const color = 'rgba(' + color1 + ', ' + color2 + ', ' + color3 + ', 1)';

        const dataset = {
          label: item.machine,
          data: Object.values(item.listNetproductionPerHoure),
          borderColor: [color],
          borderWidth: 1.5,
          fill: false
        };

        this.datasets.push(dataset);
      }
      console.log('this.data1 ')
      console.log(this.data);

      this.getData2(this.defaultDate);

      this.drawChart();

    }, err => {


    });

  }
  drawChart() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    const myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.lables,
        datasets: this.datasets
      },
      options: {
        responsive: true,
        display: false
      }
    });
  }


  onChangeDate() {
    console.log('onChangeDate => ' + this.selectedDate);
    if (this.selectedDate) {
      this.getData1(this.selectedDate);
    }
  }



  logOut() {
    this.authenticationService.logOut();
    this.router.navigateByUrl("/authentification");
  }
}
