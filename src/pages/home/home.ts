import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { ReddittApiService } from '../../shared/reddit.api.service';
import { AndroidNews, RedditApiClass } from '../../shared/android-news.modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  androidNews: RedditApiClass[];
  limit: number;
  constructor(public navCtrl: NavController,
              public redditApiService: ReddittApiService,
              public platform: Platform,
              private toastCtrl: ToastController) {
                
        this.limit = 5;
        this.redditApiService.getNews().subscribe(data => {
          console.log(data);
          this.androidNews=data.data.children;
        });
  }


  doInfinite(infiniteScroll){
     var idOfLast: string =this.androidNews[this.androidNews.length-1].data.name;
    let data={'key':'after', 'value':idOfLast};
    this.redditApiService.getNews(data).subscribe(data => {
      this.androidNews=this.androidNews.concat(data.data.children);
      infiniteScroll.complete();
         
      
    });
  }

  doRefresh(refresher){
    var idOfFirst: string =this.androidNews[0].data.name;
   let data={'key':'before', 'value':idOfFirst};
   this.redditApiService.getNews(data).subscribe(data => {
     if(data.data.children==0){
      refresher.complete();
        
          let toast = this.toastCtrl.create({
            message: 'No new stories',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
        
     }
     else{
      this.androidNews=data.data.children.concat(this.androidNews);
      refresher.complete();
      let toast = this.toastCtrl.create({
        message: 'Loaded new stories',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
     } 
   });
 }
}
