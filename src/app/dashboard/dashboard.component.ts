import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import * as Chart from 'chart.js';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

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
  };
  hideChart = false;

  constructor(public datepipe: DatePipe, private router: Router, private dashboardService: DashboardService, private authenticationService: AuthenticationService) {

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
      const data2: any = resp;

      for (const [key, value] of Object.entries(data2)) {

        console.log('boucle for 2');
        const color: any = value;

        this.data.get(key).color = color.split('/')[1];
      }
      console.log('this.data2 ');
      console.log(this.data);


      this.getData3(this.defaultDate);


    }, err => {


    });

  }


  getData3(date) {
    this.dashboardService.getReport3(date).subscribe(resp => {

      console.log('the resp3 is ');
      console.log(resp);

      const data3: any = resp;


      for (const item of data3) {
        console.log('boucle for 3');
        console.log(this.data.get(item.machine));

        this.data.get(item.machine)['performance'] = item.performance;
        this.data.get(item.machine)['availability'] = item.availability;
        this.data.get(item.machine)['quality'] = item.quality;
        this.data.get(item.machine)['oee'] = item.oee;
      }

      console.log('this.data3 ');
      console.log(this.data);

      this.dataList = Array.from(this.data.values());

    }, err => {


    });
  }


  getData1(date) {
    this.dataList = [];
    this.datasets = [];
    // when no data to hide previous data
    this.dashboardService.getReport1(date).subscribe(resp => {
      console.log('the resp1 is ');
      console.log(resp);

      const data1: any = resp;
      if (data1[0]) {
        this.dateTimeFrom = data1[0].datetimeFrom;
        this.dateTimeTo = data1[0].datetimeTo;



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
        console.log('this.data1 ');
        console.log(this.data);
        this.drawChart();

        this.getData2(this.defaultDate);

      } else {
        this.hideChart = true;

        Swal.fire(
          'Error',
          'No Data for this Date',
          'error'
        );
      }
    }, err => {
      Swal.fire(
        'Error',
        'Error Occured Please Try again',
        'error'
      );
    });
  }

  drawChart() {
    this.hideChart = false;
    setTimeout(() => {
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

    }, 1000);


  }


  onChangeDate() {

    if (this.selectedDate) {
      const date = new Date(this.selectedDate);
      const formatDate = this.datepipe.transform(date, 'yyyy-MM-dd');
      console.log('onChangeDate => ' + formatDate);

      this.getData1(formatDate);
    }
  }



  logOut() {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/authentification');
  }
}
