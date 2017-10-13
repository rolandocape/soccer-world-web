import { Component, OnInit } from '@angular/core';
import {SoccerdataService} from "../sevices/soccerdata.service";

@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.css']
})
export class LeagueDetailsComponent implements OnInit {
  public detail = {};
  public urlOneLeague: string;

  constructor(public dataService:SoccerdataService) {
    this.urlOneLeague = this.dataService.urls[1];
  }

  ngOnInit() {
    this.getOneLeague();
  }

  getOneLeague() {
    this.dataService.load(this.urlOneLeague)
      .then(data => {
        this.detail = data;
      })
  }

}
