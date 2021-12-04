import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastDetailsComponent } from './forecast-details/forecast-details.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

const routes: Routes = [
  {path:'',component:WeatherDetailsComponent},
  {path:'forecast/:zipcode',component:ForecastDetailsComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
