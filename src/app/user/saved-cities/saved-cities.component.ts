import { Component, OnInit } from '@angular/core';
import {City} from '../../shared/interfaces/city';
import {FirebaseService} from '../../shared/firebase.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-saved-cities',
  templateUrl: './saved-cities.component.html',
  styleUrls: ['./saved-cities.component.css']
})
export class SavedCitiesComponent implements OnInit {

  public cities: City[];
  public city: any = {};
  public panelOpenState: boolean = false;
  public updateForm: boolean = true;
  //public saveForm: boolean = true;

  public userId = this.route.snapshot.paramMap.get('id');

  constructor(private firebaseService: FirebaseService, private route: ActivatedRoute)  //inject activated route to get the id of the user from the user-routing.module.ts
  {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
    {
      console.log(id);
      this.getCities(id);
    }
  }

  //methods
  public getCities(id: string)
  {
      this.firebaseService
        .getUserCities(id)
        .subscribe(cities => {
          console.log(cities);
          this.cities = cities;
        });
  }

  public saveCityUpdate(newCity: City) {
    console.log(newCity);
    this.firebaseService
      .updateCity(this.userId, this.city.id, newCity);

    this.city = {}; //clear the form
  }

  public deleteCity(city: City)
  {
    this.firebaseService
      .deleteCity(this.userId, city);
  }


  //we already have the properties of the weather and we just binding them to the form
  public updateCity(city: any)
  {
    console.log(city);
    this.city.name = city.weather.name;
    this.city.description = city.weather.description;
    this.city.temperature = city.weather.temperature;
    this.city.id = city.id;
  }

}
