import { Injectable } from '@angular/core';
import {Weather} from '../shared/interfaces/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  //property shared between components
  public weather: Weather = {
    name: '',
    country: '',
    image: '',
    description: null,
    temperature: null,
    lat: null,
    lon: null
  };

  constructor() { }
}
