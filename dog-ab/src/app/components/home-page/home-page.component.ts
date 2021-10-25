import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {application} from "express";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {

  isStart: boolean = false;
  sizes = [
    {name: "2x2", id: 2},
    {name: "4x4", id: 4},
    {name: "6x6", id: 6}];

  newGameForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    boardSize: new FormControl('', )
  });


  toggleStart() {
    this.isStart = true;
  }

  //validate name was entered, open game screen
  startGame(gameFormValue: any) {
    //const response = this.http.post('http://localhost:4201/', newGame,{observe:"response",responseType:"json"});
    //response.subscribe();
    document.location.href =`/game?name=${gameFormValue.name}&boardsize=${gameFormValue.boardSize}`;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.newGameForm.controls[controlName].hasError(errorName);
  }

  //messages = this.http.get<any[]>('http://localhost:4201');

  constructor(private http:HttpClient) { }
}
