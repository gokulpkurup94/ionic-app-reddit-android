import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams} from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ReddittApiService {
    baseUrl: string

    constructor(private http: Http){
        this.baseUrl="https://www.reddit.com/r/Android/new.json?limit=5";
    }
    getNews(data?: any):Observable<any>{
        let urlParams= new URLSearchParams();
        if(data){
            urlParams.set(data.key, data.value);
        }
        return this.http.get(`${this.baseUrl}`,{search: urlParams })
           .map((response:Response)=> {
              return response.json( );
          });
      } 
      
  
}