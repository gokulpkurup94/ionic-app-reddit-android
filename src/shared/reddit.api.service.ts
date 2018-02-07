import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ReddittApiService {
    baseUrl : string

    constructor(private http: Http){
        this.baseUrl="https://www.reddit.com/r/Android/new.json?limit=5&";
    }
    getNews(nameOfAnchorPoint:string):Observable<any>{
        return this.http.get(`${this.baseUrl}${nameOfAnchorPoint}`)
           .map((response:Response)=> {
              return response.json();
          });
      }
      
  
}