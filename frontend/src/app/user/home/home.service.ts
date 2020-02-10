import { Injectable } from '@angular/core';
import { UserFeedback } from './feedback.class';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { throwError as observableThrowError, Observable , ReplaySubject, of } from 'rxjs';
import { map, flatMap, take, zip, catchError, tap, refCount, multicast } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: Http,
    public snackBar: MatSnackBar,
  ) { }

  sendFeedback(feedback) {
      return this.http.post(`${environment.api}/api/feedback`, feedback).pipe(map(res => res.json()));
  }

}
