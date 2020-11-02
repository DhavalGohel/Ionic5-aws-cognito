import { Component } from '@angular/core';
import { CognitoService } from '../services/cognito-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentUsername: string = '';

  constructor(public cognitoSerive:CognitoService, public router: Router) {
    this.getCurrentUserName();
  }

  async getCurrentUserName() {
    this.currentUsername = await this.cognitoSerive.currentUser();
  }

  async logout() {
    let userData = await this.cognitoSerive.currentUser();
    this.cognitoSerive.logOut(userData)
    .then((res) =>{
      localStorage.clear();
      this.router.navigate(['login'])
    }, err =>{
      console.log(err);
    });
  }
}
