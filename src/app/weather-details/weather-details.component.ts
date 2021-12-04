import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {

  currentWeatherData: any = new Array();
  zipCode: any;
  constructor(private weatherService: WeatherService,
    private toast: ToastrService,) { }

  ngOnInit(): void {
    this.getCurrentWeatherData();
  }

  // get the list of all weather report details
  getCurrentWeatherData() {    
    const data = JSON.parse(localStorage.getItem('currentWeatherReport')!);
    if (data) this.currentWeatherData = data;
  }

  // submit new zipcode
  getCurrentWeatherZipCode(zipCode: string) {
    if (zipCode && zipCode !== '') {
      let ifExists = false;
      this.currentWeatherData.forEach((resp: any) => {
        if (resp.zipcode === zipCode) ifExists = true;
      });
      if (!ifExists) {
        this.weatherService.getCurrentWeatherByZipCode(zipCode).subscribe(
          (data: any) => {
            if (data) {
              data = { ...data, zipcode: zipCode };
              this.currentWeatherData.push(data);
              localStorage.setItem(
                'currentWeatherReport',
                JSON.stringify(this.currentWeatherData)
              );
            }
            this.zipCode = '';
            this.toast.success("zipcode added successfully");
          },
          () => {
            this.toast.warning(
              'invalid zipcode: ' +
                zipCode +
                ', or data not availble for this zipcode.'
            );
            this.zipCode = '';
          }
        );
      } else {
        this.zipCode = '';
        this.toast.warning("zipcode already exists.");
      }
    } else {
      this.toast.warning("Please enter zipcode.");
    }
  }

  //remove selected weather details
  remove(zipcode: string) {
    if (this.currentWeatherData && this.currentWeatherData.length > 0) {
      this.currentWeatherData = this.currentWeatherData.filter(
        (data: any) => data.zipcode !== zipcode
      );
      localStorage.setItem(
        'currentWeatherReport',
        JSON.stringify(this.currentWeatherData)
      );
    }
  }
}
