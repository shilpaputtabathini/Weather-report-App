import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

constructor(private httpClient: HttpClient) { }

apiUrl = 'http://api.openweathermap.org/data/2.5/';
token = '5a4b2d457ecbef9eb2a71e480b947604';

getCurrentWeatherByZipCode(zipCode:string){
  return this.httpClient.get(this.apiUrl + 'weather?zip='+zipCode+',in&appid='+this.token);
}

getForCastWeather(zipCode:string) {
  return this.httpClient.get(this.apiUrl + 'forecast/daily?zip='+zipCode+',in&appid='+this.token);
}

}
