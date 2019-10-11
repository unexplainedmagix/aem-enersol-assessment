import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/services/auth/auth-interceptor';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[AuthInterceptor]
})
export class DashboardComponent implements OnInit {

  data:any = {
    chartBar:[],
    chartDonut:[],
    tableUsers:[]
  };
  loaded = false;
  private donutChart: am4charts.PieChart;
  private barChart: am4charts.XYChart;

  constructor(private router:Router,private authInterceptor:AuthInterceptor,private http:HttpClient,private zone: NgZone) { }

  logout(){
    localStorage.setItem('token', '');
    this.router.navigateByUrl('/sign-in');
  }

  ngOnInit() {
    this.http.get("http://test-demo.aem-enersol.com/api/dashboard")
    .subscribe(
      response=>{
        this.data = response;
        this.loaded = true;
        this.initDonutChart();
        this.initBarChart();
      },
      error=>{
        console.log("Error: ",error.message);
      }
    );
  }

  initDonutChart(){
    this.zone.runOutsideAngular(() => {
      am4core.useTheme(am4themes_animated);
      let chart = am4core.create("donutChart", am4charts.PieChart);
      chart.data = this.data.chartDonut;
  
      chart.innerRadius = am4core.percent(35);
  
      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "name";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
  
      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
      this.donutChart = chart;
    });
  }

  initBarChart(){
    this.zone.runOutsideAngular(() => {
      am4core.useTheme(am4themes_animated);
      let chart = am4core.create("barChart", am4charts.XYChart);
      chart.data = this.data.chartDonut;
  
      // Add and configure Series
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "name";
      series.name = "Value";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = .8;

      let columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;
      this.barChart = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.donutChart) {
        this.donutChart.dispose();
      }
      if (this.barChart) {
        this.barChart.dispose();
      }
    });
  }

}
