import { Component, OnInit } from '@angular/core';
import { HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.css']
})
export class LeagueDetailsComponent implements OnInit {

  public details;

  constructor(public homePage:HomeComponent) {

    this.details = this.homePage.getOneLeague()
  }

  ngOnInit() {
  }

}
