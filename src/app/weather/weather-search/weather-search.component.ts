import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';
import {Weather} from '../../shared/interfaces/weather';
import {WeatherDataService} from '../weather-data.service';
import {AuthProvider} from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {

  public query: string = '';
  //public weather: any;
  public errorMessage: any = {};

  //setter
  public set weather(data: Weather)
  {
    this.weatherDataService.weather = data;
  }


  constructor(private weatherService: WeatherService, private weatherDataService: WeatherDataService) { }

  ngOnInit() {
  }




  //methods
  public search()
  {
    this.weatherService.searchWeatherData(this.query)
      .subscribe(
        weather => this.weather = weather,
        error => this.errorMessage = error,
        () => this.query = ''
      );
  }

}
