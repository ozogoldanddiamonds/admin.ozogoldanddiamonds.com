import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-subbranch-dashboard',
  templateUrl: './subbranch-dashboard.component.html',
  styleUrls: ['./subbranch-dashboard.component.css']
})
export class SubbranchDashboardComponent 
  implements AfterViewInit {

  @ViewChild('barChart')
  barChartRef!: ElementRef;

  @ViewChild('lineChart')
  lineChartRef!: ElementRef;

  @ViewChild('donutChart')
  donutChartRef!: ElementRef;

  ngAfterViewInit(): void {

    setTimeout(() => {

      this.loadCharts();

    }, 100);

  }

  loadCharts() {

    const commonOptions: any = {

      responsive: true,

      maintainAspectRatio: false

    };

    // ================= BAR CHART =================

    const ctxBar =
      this.barChartRef.nativeElement.getContext('2d');

    const gradientBar =
      ctxBar.createLinearGradient(0, 0, 0, 300);

    gradientBar.addColorStop(0, '#D4AF37');

    gradientBar.addColorStop(1, '#8B0000');

    new Chart(this.barChartRef.nativeElement, {

      type: 'bar',

      data: {

        labels: [
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat'
        ],

        datasets: [

          {

            label: 'Sales',

            data: [
              25000,
              42000,
              38000,
              52000,
              61000,
              70000
            ],

            backgroundColor: gradientBar,

            borderRadius: 8

          }

        ]

      },

      options: {

        ...commonOptions,

        plugins: {

          legend: {

            display: false

          }

        }

      }

    });

    // ================= LINE CHART =================

    const ctxLine =
      this.lineChartRef.nativeElement.getContext('2d');

    const gradientLine =
      ctxLine.createLinearGradient(0, 0, 0, 300);

    gradientLine.addColorStop(
      0,
      'rgba(212,175,55,0.5)'
    );

    gradientLine.addColorStop(
      1,
      'rgba(212,175,55,0)'
    );

    new Chart(this.lineChartRef.nativeElement, {

      type: 'line',

      data: {

        labels: [
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat'
        ],

        datasets: [

          {

            label: 'Visitors',

            data: [
              80,
              120,
              100,
              180,
              240,
              300
            ],

            borderColor: '#D4AF37',

            backgroundColor: gradientLine,

            fill: true,

            borderWidth: 3,

            tension: 0.4,

            pointBackgroundColor: '#8B0000'

          }

        ]

      },

      options: {

        ...commonOptions,

        plugins: {

          legend: {

            display: false

          }

        }

      }

    });

    // ================= DONUT CHART =================

    new Chart(this.donutChartRef.nativeElement, {

      type: 'doughnut',

      data: {

        labels: [

          'Delivered',

          'Pending',

          'Processing'

        ],

        datasets: [

          {

            data: [

              65,

              20,

              15

            ],

            backgroundColor: [

              '#28a745',

              '#ffc107',

              '#17a2b8'

            ],

            borderWidth: 0

          }

        ]

      },

      options: {

        ...commonOptions,

        plugins: {

          legend: {

            position: 'bottom'

          }

        }

      }

    });

  }

}