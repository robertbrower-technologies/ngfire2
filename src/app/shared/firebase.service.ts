import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {City} from './interfaces/city';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public userCollection: AngularFirestoreCollection = this.afs.collection('users');
  public cityCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) { }

  //methods
  public addCity(userId: string, weather: any)  //returns a promise
  {
    const city = {
      weather,
      time: new Date()
    };

    return this.userCollection
      .doc(userId)
      .collection('cities')     //does not exist, created right now
      .add(city);
  }

  public getCity(userId: string, city: City)
  {
    return this.afs.doc(`users/${userId}/cities/${city}`);
  }

  public deleteCity(userId: string, city: City)
  {
    return this.getCity(userId, city).delete();
  }

  public updateCity(userId: string, city: City, weather)
  {
    const newCity = {
      weather,
      time: new Date()
    };

    return this.getCity(userId, city).set(newCity);
  }

  private handleError(res: HttpErrorResponse)
  {
    console.error(res);
    return throwError(res.error || 'Server error');
  }

  public getUserCities(userId: string): Observable<any[]>
  {
    this.cityCollection = this.afs.collection(`users/${userId}/cities`, ref => ref.orderBy('time', 'desc'));

    //snapshotChanges()
    //What is it? - The current state of your collection. Returns an Observable of data as a synchronized array of DocumentChangeAction[].

    //Actions returned by snapshotChanges are of type DocumentChangeAction and contain a type and a payload
    //The type is either added, modified or removed and the payload contains the document's id, metadata and data

    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    return this.cityCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;   //we get a reference to city id in case we want to delete, update that particular document
        return { ...data };
      }))
    );
  }
}
