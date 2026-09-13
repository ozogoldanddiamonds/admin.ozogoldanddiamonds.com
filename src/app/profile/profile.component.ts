import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
   showProfilePopup = false;
  role = localStorage.getItem('role') || '';
 userName = localStorage.getItem('name');

  email = localStorage.getItem('email');
localStorage: any;
 closeProfile() {

  this.showProfilePopup = false;

}

}
