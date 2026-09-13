import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { OrderService } from '../Services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
ordersCount: number = 0;
branchOrdersCount  = 0;
subBranchOrders = 0;


constructor(

  private orderService: OrderService,
   private router: Router,


) { }

  @ViewChild('barChart') barChartRef!: ElementRef;
  @ViewChild('lineChart') lineChartRef!: ElementRef;
  @ViewChild('donutChart') donutChartRef!: ElementRef;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadCharts();
    }, 100);
  }
  getSubBranchOrders() {

  const subBranchId = localStorage.getItem("adminId");

console.log("Sub Branch ID:", subBranchId);

this.orderService.getSubBranchOrders(subBranchId!).subscribe({
  next: (res: any) => {
    console.log(res);
    this.subBranchOrders = res.count;
  },
  error: (err: any) => {
    console.log(err);
  }
});

}

getBranchOrders() {
  

  const branchId = localStorage.getItem("adminId");

  if (!branchId) {
    console.log("Branch ID not found");
    return;
  }
  

  this.orderService.getBranchOrders(branchId).subscribe({

    next: (res: any) => {

      console.log(res);

      this.branchOrdersCount = res.count;

    },

    error: (err: any) => {

      console.log(err);

    }

  });

}
  getOrders() {

  this.orderService.getAllOrders().subscribe({

    next: (res: any) => {

      console.log(res);

      this.ordersCount = res.count;

    },

    error: (err) => {

      console.log(err);

    }

  });

}
ngOnInit(): void {

  this.getOrders();
     this.getBranchOrders();

  this.getSubBranchOrders();

}

  loadCharts() {

    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false
    };

    // 🔥 BAR CHART (Gradient)
    const ctxBar = this.barChartRef.nativeElement.getContext('2d');
    const gradientBar = ctxBar.createLinearGradient(0, 0, 0, 300);
    gradientBar.addColorStop(0, '#ffd700');
    gradientBar.addColorStop(1, '#ff3300');

    new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['05','06','07','08','09','10'],
        datasets: [{
          data: [30, 35, 32, 28, 20, 15],
          backgroundColor: gradientBar,
          borderRadius: 6
        }]
      },
      options: {
        ...commonOptions,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#fff' }, grid: { color: '#5a1a1a' } },
          y: { ticks: { color: '#fff' }, grid: { color: '#e27b7b' } }
        }
      }
    });

    // 🔥 LINE CHART
    const ctxLine = this.lineChartRef.nativeElement.getContext('2d');
    const gradientLine = ctxLine.createLinearGradient(0, 0, 0, 300);
    gradientLine.addColorStop(0, 'rgba(255,200,0,0.5)');
    gradientLine.addColorStop(1, 'rgba(255,50,0,0)');

    new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['05','06','07','08','09','10'],
        datasets: [
          {
            label: 'Running',
            data: [20, 25, 23, 18, 10, 5],
            borderColor: '#ff9933',
            backgroundColor: gradientLine,
            fill: true,
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: '#fff'
          },
          {
            label: 'Waiting',
            data: [10, 12, 11, 9, 6, 3],
            borderColor: '#ffd700',
            borderWidth: 2,
            tension: 0.4
          }
        ]
      },
      options: {
        ...commonOptions,
        plugins: {
          legend: { labels: { color: '#fff' } }
        },
        scales: {
          x: { ticks: { color: '#fff' }, grid: { color: '#5a1a1a' } },
          y: { ticks: { color: '#fff' }, grid: { color: '#5a1a1a' } }
        }
      }
    });

    // 🔥 DONUT CHART
    new Chart(this.donutChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Desktop', 'Mobile'],
        datasets: [{
          data: [40, 60],
          backgroundColor: ['#fb8005','#ffd700'],
          borderWidth: 0
        }]
      },
      options: {
        ...commonOptions,
        plugins: {
          legend: { labels: { color: '#fff' } }
        }
      }
    });
  }
}
