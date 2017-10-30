import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TeamsService {
  public data;

  constructor(private http: Http) {
  }

  loadTeam(league_slug, season_slug, team_name) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/api/teams/' + league_slug + '/' + season_slug + '/' + team_name)
        .map(res => {
          if (res.status < 200 || res.status >= 300) {
            throw new Error('This request has failed' + res.status);
          } else {
            return res.json();
          }
        })
        .subscribe( data => {
          this.data = data;
          resolve(this.data);
        })
    })
  }

}