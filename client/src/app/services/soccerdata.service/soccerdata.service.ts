import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SoccerdataService {
  public data;

  constructor(private http: Http) {
  }

  loadLeagues() {
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,then on the response, it'll map the JSON data to a parsed JS object.Next, we process the data and resolve the promise with the new data.
      this.http.get('http://localhost:3000/api/leagues')
        .map(res => {
          // If request fails, throw an Error
          if (res.status < 200 || res.status >= 300) {
            throw new Error('This request has failed' + res.status);
          }
          // If request is fine return response
          else {
            return res.json();
          }
        })
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          console.log(this.data);
        });
    });
  }

  loadLeague(league_slug) {
    // if (this.data) {
    //   // if data is already loaded
    //   return Promise.resolve(this.data);
    // }
    //if the data is not loaded
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,then on the response, it'll map the JSON data to a parsed JS object.Next, we process the data and resolve the promise with the new data.
      this.http.get('http://localhost:3000/api/league/' + league_slug)
        .map(res => {
          // If request fails, throw an Error
          if (res.status < 200 || res.status >= 300) {
            throw new Error('This request has failed' + res.status);
          }
          // If request is fine return response
          else {
            return res.json();
          }
        })
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          console.log(this.data);
        });
    });
  }

  loadSeasons(league_slug) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/api/seasons/' + league_slug)
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
          console.log(this.data);
        });
    });
  }

  loadTopScorers(league_slug, season_slug) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/api/' + league_slug + '/seasons/' + season_slug)
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
          console.log(this.data);
        });
    });
  }


  loadStandings(league_slug, season_slug) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/api/standings/' + league_slug + '/' + season_slug)
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
          console.log(this.data);
        });
    });
  }

  loadRounds(league_slug, season_slug) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/api/rounds/' + league_slug + '/' + season_slug)
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
          console.log(this.data);
        });
    });
  }

  loadReferees(league_slug, season_slug) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/api/referees/' + league_slug + '/' + season_slug)
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
          console.log(this.data);
        });
    });
  }


}
