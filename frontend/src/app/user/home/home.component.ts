import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations'
import { HomeService } from './home.service';
import { Observable, ReplaySubject } from 'rxjs';
import { map, flatMap, take, zip, catchError, tap, refCount, multicast } from 'rxjs/operators';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { Feedback } from '../../shared/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadein', [
      state('*', style({opacity: 1 })),
      transition('void => *', [
        style({opacity: 0 }),
        animate('900ms ease-out')
      ]),
    ])
  ]
})
export class HomeComponent implements OnInit {
  feedback: Feedback;
  isIE: boolean;

  constructor(
    private homeService: HomeService,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
      const userAgent: string = window ? window.navigator.userAgent: '';
      this.isIE = userAgent.includes('Trident');

      this.feedback = {
        feedback: ""
      };
  }

  handleSendClick() {
    this.homeService.sendFeedback(this.feedback)
    .subscribe(
      val => {
        if(val.result === 'created' || val.result === 'updated') {
            this.snackBar.open('feedback sent.', '', { duration: 2000 });
        }else{
            this.snackBar.open('error.', '', { duration: 2000 });
        }
    },
      err => {
        console.log(err);
        this.snackBar.open('error.', '', { duration: 2000 });
      }
    );
  }

  private display(text: string) {
    this.snackBar.open(text, '', {
      duration: 2000
    })
  }

}
