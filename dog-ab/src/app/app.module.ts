import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InfoComponent } from './components/info/info.component';
import { ScoreTableComponent } from './components/high-score/score-table/score-table.component';
import { HighScoreContainerComponent } from './components/high-score/high-score-container/high-score-container.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {CardComponent} from "./components/card/card.component";
import {MatCardModule} from "@angular/material/card";
import { GameBoardComponent } from './components/game-board/game-board.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { GameEndComponent } from './components/game-end/game-end.component';
import {HttpClientModule} from "@angular/common/http";
import { RouterModule } from '@angular/router';
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
    declarations: [
        AppComponent,
        InfoComponent,
        ScoreTableComponent,
        HighScoreContainerComponent,
        HomePageComponent,
        CardComponent,
        GameBoardComponent,
        GameEndComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: 'game', component: GameBoardComponent},
            {path: 'high-scores', component: HighScoreContainerComponent},
            {path: 'info', component: InfoComponent},
            {path: 'game-end', component: GameEndComponent},
            {path: '', component: HomePageComponent},
            {path: '**', redirectTo: '', component: HomePageComponent}

        ]),
        MatGridListModule,
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
