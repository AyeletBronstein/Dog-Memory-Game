import { Component, OnInit } from '@angular/core';
import {CardData} from "../card/CardData";
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {GameResult} from "../high-score/game-result";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  constructor(private route: ActivatedRoute,private http:HttpClient) { }

  ngOnInit(): void {
    this.fillImages();
    this.setupCards();
    this.startTimer();
  }

  boardSize: number=this.route.snapshot.queryParams.boardsize;
  numCards: number = this.boardSize*this.boardSize/2;
  pName:string= this.route.snapshot.queryParams.name;
  flippedCards: CardData[] = [];
  matchedCount = 0;
  moves: number=0;
  time: number = 0;
  display:string="";
  interval:number=0;
  cards: CardData[] = [];

  //size of card images should be == to num Cards, rest of code, creates 2 of each card
  //fill card images accordingly

  cardImages:string[]=[];

  fillImages():void {
    for (let i=0; i<this.numCards;i++){
      this.cardImages.push("a"+i);
    }
  }

  setupCards(): void {
    this.cards = [];
    this.cardImages.forEach((image) => {
      const cardData: CardData = {
        imageId: image,
        breed:"",
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });

    });

    this.cards = this.shuffleArray(this.cards);
  }

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  startTimer() {
    console.log("=====>");
    // @ts-ignore
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.display=this.transform( this.time)
    }, 1000);
  }

  transform(value: number): string {
    let sec_num = value;
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = 0;}
    if (minutes < 10) {minutes = 0;}
    /*if (seconds < 10) {seconds = 0;}*/
    return hours+':'+minutes+':'+seconds;
  }
  pauseTimer() {
    clearInterval(this.interval);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2)
    {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length === 2) {
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  checkForCardMatch(): void {
    this.moves++;
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.cardImages.length) {
          this.pauseTimer();
          let score= Math.ceil(this.time + this.moves*0.5);
          let row:GameResult = {date: Date.now().toString(),name: this.pName, moves: this.moves, time:this.time.toString(),score:score,boardSize:this.boardSize };
          const response = this.http.post('http://localhost:4201/game-end',row).subscribe(callback=>{document.location.href =`/game-end?&${row}`;});

        }
      }

    }, 1000);
  }

}
