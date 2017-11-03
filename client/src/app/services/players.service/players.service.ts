import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayersService {
  public data;

  constructor(private http: Http) {
  }


  loadPlayer(league_slug, season_slug, player_identifier) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/api/player/' + league_slug + '/' + season_slug + '/' + player_identifier)
        .map(res => {
          if (res.status < 200 || res.status >= 300) {
            throw new Error('This request has failed' + res.status);
          } else {
            return res.json();
          }
        })
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    })
  }

  loadTeamPlayer(league_slug, season_slug, team_slug, player_identifier) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/api/teamPlayer/' + league_slug + '/' + season_slug + '/' + team_slug + '/' + player_identifier)
        .map(res => {
          if (res.status < 200 || res.status >= 300) {
            throw new Error('This request has failed' + res.status);
          } else {
            return res.json();
          }
        })
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    })
  }

}
