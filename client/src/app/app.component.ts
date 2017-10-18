import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public sideBarOpen = false;

  public onIconToggle() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
