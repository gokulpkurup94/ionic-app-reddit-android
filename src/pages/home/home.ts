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
        this.redditApiService.getNews("after=null").subscribe(data => {
          this.androidNews=data.data.children;
        });
  }


  doRefresh(refresher) {
    let oldNewsIndex: string;
    oldNewsIndex=this.androidNews[0].data.name;
    this.redditApiService.getNews("after=null").subscribe(data => {
      this.androidNews=data.data.children;
      if(oldNewsIndex!=this.androidNews[0].data.name){
        setTimeout(() => {
          refresher.complete();

          let toast = this.toastCtrl.create({
            message: 'Loaded new stories',
            duration: 2000,
            position: 'bottom'
          });
        
          toast.onDidDismiss(() => {});
        
          toast.present();
        }, 1000);
      }
      else{
        setTimeout(() => {
          refresher.complete();
        
          let toast = this.toastCtrl.create({
            message: 'No new stories',
            duration: 2000,
            position: 'bottom'
          });
        
          toast.onDidDismiss(() => {});
        
          toast.present();
        }, 1000);
        }
    });


    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll){
    this.redditApiService.getNews("after="+this.androidNews[this.androidNews.length-1].data.name).subscribe(data => {
      for(let i = 0; i < this.limit; i++){
        this.androidNews.push(data.data.children[i]); 
      }
    });
      setTimeout(() => {
        infiniteScroll.complete();
      }, 5000);
  }
}
