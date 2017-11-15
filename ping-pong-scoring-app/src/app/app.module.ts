import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { DataService } from "./data/data.service";
import { GameService } from "./game/game.service";
import { TextService } from "./text/text.service";
import { HomeComponent } from "./home/home.component";
import { StandingsComponent } from "./standings/standings.component";
import { StartGameComponent } from "./start-game/start-game.component";
import { SelectPlayerComponent } from "./select-player/select-player.component";
import { GameComponent } from "./game/game.component";
import { MockGameDirective } from "./testing/mock-game.directive";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StandingsComponent,
    StartGameComponent,
    SelectPlayerComponent,
    GameComponent,
    MockGameDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    DataService,
    GameService,
    TextService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
