import {Component, OnInit} from '@angular/core';
import {GameResult} from "../game-result";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-high-score-container',
  templateUrl: './high-score-container.component.html',
  styleUrls: ['./high-score-container.component.css']
})
export class HighScoreContainerComponent {

  constructor(private http:HttpClient) { }

  // @ts-ignore
  file={"2":[],"4":[],"6":[]};
  response = this.http.get('http://localhost:4201/high-scores').subscribe(data => {
    // @ts-ignore
    this.file=data;
  });

}
