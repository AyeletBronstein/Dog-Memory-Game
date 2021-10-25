import {Component, Input, OnInit} from '@angular/core';
import {GameResult} from "../high-score/game-result";

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.css']
})
export class GameEndComponent implements OnInit {

  @Input() gameresult: GameResult={
    date:"",
    name:"",
    time: "",
    moves:0,
    score:0,
  boardSize:0};

  constructor() { }

  ngOnInit(): void {
  }

}
