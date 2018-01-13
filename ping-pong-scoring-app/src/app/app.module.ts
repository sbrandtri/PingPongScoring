import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { DataService } from "./data/data.service";
import { GameDataService } from "./data/game-data.service";
import { GameComponent } from "./game/game.component";
import { GameService } from "./game/game.service";
import { HomeComponent } from "./home/home.component";
import { SelectPlayerComponent } from "./select-player/select-player.component";
import { StandingsComponent } from "./standings/standings.component";
import { StartGameComponent } from "./start-game/start-game.component";
import { MockGameDirective } from "./testing/mock-game.directive";
import { MockHomeDirective } from "./testing/mock-home.directive";
import { TextService } from "./text/text.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StandingsComponent,
    StartGameComponent,
    SelectPlayerComponent,
    GameComponent,
    MockGameDirective,
    MockHomeDirective
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule.forRoot()],
  providers: [
    { provide: DataService, useClass: GameDataService },
    GameService,
    TextService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
