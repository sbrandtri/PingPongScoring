import { Component, EventEmitter, OnInit, Output } from "@angular/core";

import { GameService } from "./game.service";
import { DataService } from "../data/data.service";
import { Player } from "../player/player.model";
import { TextService } from "../text/text.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {

  @Output() navigate = new EventEmitter<string>();

  constructor(
    readonly game: GameService,
    readonly text: TextService
  ) { }

  ngOnInit() {
  }

  quitGame(): void {
    // TODO: Add prompt
    this.game.reset();
    this.navigate.emit(this.text.pages.home);
  }

}
