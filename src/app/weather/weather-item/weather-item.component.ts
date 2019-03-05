import { Component, OnInit } from '@angular/core';
import {WeatherDataService} from '../weather-data.service';
import {Weather} from '../../shared/interfaces/weather';
import {UserAuthService} from '../../user/auth-service.service';
import {FirebaseService} from '../../shared/firebase.service';
import {MatSnackBar} from '@angular/material';
import {User} from '../../shared/interfaces/user';
import {City} from '../../shared/interfaces/city';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent implements OnInit {

  //public weather: any;
  public user: User | null;
  //getter (like property weather)
  public get weather(): Weather
  {
    return this.weatherDataService.weather;
  }


  constructor(private weatherDataService: WeatherDataService,
              private userAuthService: UserAuthService,
              private firebaseService: FirebaseService,
              private snackBar: MatSnackBar) {
    //get the user from any component
    this.userAuthService.user$.subscribe(user => this.user = user);
  }

  ngOnInit() {
  }


  //methods
  public addCity()
  {
    const city: City = {
      name: this.weather.name,
      country: this.weather.country,
      description: this.weather.description,
      temperature: this.weather.temperature,
      lat: this.weather.lat,
      lon: this.weather.lon
    };

    this.firebaseService
      .addCity(this.user.uid, city)
      .then(res => {
        this.snackBar.open(`Success! City saved`, 'OK', {
          duration: 5000
        });
      }).catch(err => {
        console.log(err);
    });
  }


}
