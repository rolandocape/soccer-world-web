import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SoccerdataService {

  public data;
  // why I cannot use let or var, when to use it in the constructor
  public urls = [
    'http://localhost:3000/api/leagues',
    'http://localhost:3000/api/league/serie-a'
  ];

  constructor(private http: Http) {
  }


  load(myUrl) {
    // if (this.data) {
    //   // if data is already loaded
    //   return Promise.resolve(this.data);
    // }
    //if the data is not loaded
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,then on the response, it'll map the JSON data to a parsed JS object.Next, we process the data and resolve the promise with the new data.
      this.http.get(myUrl)
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
}
