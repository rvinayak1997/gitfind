import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {
  userForm: FormGroup;
  data;
  local;
  showSpinner = false;
  errormessage = true;
  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }
  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl('')
    });
  }
  onSubmit() {
    this.errormessage = true;
    this.showSpinner = true;
    this.local =localStorage.getItem(this.userForm.value.username);
    if(this.local){
      this.data = JSON.parse(this.local);
      this.showSpinner = false;
    }
    // tslint:disable-next-line: align
    else {
      this.http.get('https://api.github.com/users/' + this.userForm.value.username + '?access_token=beba3c150021bfb49769385927dfa59fac2cdf04').subscribe(Response => {
        console.log(Response);
        this.data = Response;
        this.showSpinner = false;
        localStorage.setItem(this.userForm.value.username, JSON.stringify(Response));
      }, err => {
          this.data = false;
          this.showSpinner = false;
          this.errormessage = false;
          this.snackbar.open('No profile found', 'OK', {duration: 2000, verticalPosition: 'top', horizontalPosition: 'right'});
        });
    }

  }
}
