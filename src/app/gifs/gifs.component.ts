import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css']
})
export class GifsComponent implements OnInit, OnDestroy {
  gifs: any[] = [];
  subscription: Subscription | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getTrendingGifs();
    this.subscription = this.dataService.getGifs()
    .subscribe((response: any) => {
      this.gifs= response;
    });
  }
  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }
  
  async downloadGif(gif: any){
    let a = document.createElement('a');
    let response = await fetch(gif.images.original.url);
    let file = await response.blob();
    a.href = window.URL.createObjectURL(file);
    a.download = gif.title;
    a.click();
  }
}
