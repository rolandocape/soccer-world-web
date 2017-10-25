import {Component, OnInit} from '@angular/core';
import {SoccerdataService} from "../sevices/soccerdata.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public leagues: any;


  constructor(public dataService: SoccerdataService, private router: Router) {
  }

  ngOnInit() {
    this.getAllLeagues();
  }

  getAllLeagues() {
    this.dataService.loadLeagues()
      .then(data => {
        this.leagues = data;
      })
  }

  goToLeagueDetails(league){
    this.router.navigateByUrl('/league-details/' + league.league_slug);
  }

}
