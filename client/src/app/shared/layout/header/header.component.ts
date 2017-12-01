import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Popup} from "ng2-opd-popup";
import {UsersService} from "../../../services/users.service/users.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() onIconToggle: EventEmitter<any> = new EventEmitter();
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  model1: any = {};
  model2: any = {};
  loading = false;
  user: any;
  registration: any;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
  }

  toogleNav() {
    this.onIconToggle.emit();
  }

  openLoginModal() {
    this.popup1.options = {
      header: "LOGIN",
      color: "#2c2c2c", // red, blue....
      widthProsentage: 40, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: false, // You can hide this in case you want to use custom buttons
      confirmBtnContent: "OK", // The text on your confirm button
      cancleBtnContent: "Cancel", // the text on your cancel button
      confirmBtnClass: "btn btn-default", // your class for styling the confirm button
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button
      animation: "fadeInDown"

    };
    this.popup1.show(this.popup1.options);
  }

  goToRegister() {
    this.popup1.hide();
    this.popup2.options = {
      header: "REGISTER",
      color: "#2c2c2c", // red, blue....
      widthProsentage: 40, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: false, // You can hide this in case you want to use custom buttons
      confirmBtnContent: "OK", // The text on your confirm button
      cancleBtnContent: "Cancel", // the text on your cancel button
      confirmBtnClass: "btn btn-default", // your class for styling the confirm button
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button
      animation: "fadeInDown"
    };
    this.popup2.show(this.popup2.options);
  }

  login() {
    this.usersService.userLogin(this.model1.usernameLogin, this.model1.passwordLogin)
      .then(data => {
        this.user = data;
        if(this.user != 'undefined'){
          this.popup1.hide();
        }
      });


  }

  register() {
    this.usersService.userRegister(this.model2.usernameRegister, this.model2.passwordRegister, this.model2.firstname, this.model2.lastname)
      .then(data =>{
        this.registration = data;
      });
  }


}
