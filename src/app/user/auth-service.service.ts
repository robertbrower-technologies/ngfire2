import { Injectable } from '@angular/core';
import {User} from '../shared/interfaces/user';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  //get our user as a property from AngularFireAuth
  public user$: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router, public afAuth: AngularFireAuth, private snackBar: MatSnackBar) {
    this.user$ = this.afAuth.authState;    //returns Observable of user or null based on logged in or not user
  }

  private handleError(res: HttpErrorResponse)
  {
    console.error(res);
    return throwError(res.error || 'Server error');
  }

  public logout()
  {
    this.afAuth.auth.signOut().then(() => {
      this.snackBar.open(`You've Signed Out`, 'OK', {
        duration: 5000
      });

      //redirect to home page
      this.router.navigate(['/weather']);
    });
  }
}
