import {Component, Input, OnInit} from '@angular/core';
import {GameResult} from "../game-result";

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent {

  @Input() gamesResults: GameResult[] = [];

}
