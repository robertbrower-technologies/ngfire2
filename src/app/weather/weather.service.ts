import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Weather} from '../shared/interfaces/weather';
import {WeatherData} from '../shared/interfaces/weather-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
  private KEY = '0055a69b98d05e29f2df3e75302e9b48';
  private IMP = '&units=imperial';

  constructor(private http: HttpClient) { }

  private handleError(res: HttpErrorResponse)
  {
    console.error(res);
    return throwError(res.error || 'Server error');
  }

  //methods
  public searchWeatherData(cityName: string): Observable<Weather>
  {
    return this
      .http
      .get<WeatherData>(`${this.URL}${cityName}&APPID=${this.KEY}${this.IMP}`)
      .pipe(
        map(data => this.transformWeatherData(data)),
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private transformWeatherData(data: WeatherData): Weather
  {
    return {
      name: data.name,
      country: data.sys.country,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      description: data.weather[0].description,
      temperature: data.main.temp,
      lat: data.coord.lat,
      lon: data.coord.lon
    };
  }


}
