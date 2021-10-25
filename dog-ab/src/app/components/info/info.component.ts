import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    const response = this.http.get('http://localhost:4201/dogBreeds',{observe:"response",responseType:"json"}).subscribe( data => {
      if (data.status ==200 && data.body != null) {
        // @ts-ignore
        this.breeds = Object.keys(data.body);
      }
    });
  }

  name: string="";
  myControl = new FormControl();
  breeds=[];
  numPics: Number=3;
  breed: string="";
  fileName: string="";

  onFileSelected($event: Event){

  }

  //messages = this.http.get<any[]>('http://localhost:4201');
}
