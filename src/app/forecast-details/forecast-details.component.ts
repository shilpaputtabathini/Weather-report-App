import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-forecast-details',
  templateUrl: './forecast-details.component.html',
  styleUrls: ['./forecast-details.component.scss']
})
export class ForecastDetailsComponent implements OnInit {

  zipCode!: string;
  forCastDataForZip: any;
  filteredForeCastList = [];
  constructor(
    private activatedroute: ActivatedRoute,
    private weatherService: WeatherService,
  ) {
    this.activatedroute.params.subscribe((data) => {
      this.zipCode = data['zipcode'];
    });
  }

  ngOnInit() {
    this.weatherService
      .getForCastWeather(this.zipCode)
      .subscribe((data: any) => {
        if (data) {
          this.forCastDataForZip = data;
          this.forCastDataForZip.list.forEach((data: any, i: number) => {
            this.forCastDataForZip.list[i] = {
              ...this.forCastDataForZip.list[i],
              dt_txt: new Date(data.dt * 1000),
            };
          });
        }
      });
  } 

}
