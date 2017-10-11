import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  // function to open and close sidenav
  // toogleNav(nav: any, event) {
  //   if (nav.opened) {
  //     nav.close();
  //     event.target.classList.toggle('change');
  //   } else {
  //     nav.open();
  //     event.target.classList.toggle('change');
  //   }
  // }

}
