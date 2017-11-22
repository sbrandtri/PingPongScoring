import { Component, EventEmitter, OnInit, Output } from "@angular/core";

import { DataService } from "../data/data.service";
import { Player } from "../player/player.model";
import { TextService } from "../text/text.service";

@Component({
  selector: "app-start-game",
  templateUrl: "./start-game.component.html",
  styleUrls: ["./start-game.component.scss"]
})
export class StartGameComponent implements OnInit {

  @Output() navigate = new EventEmitter<string>();
  @Output() startGame = new EventEmitter<Player[]>();

  allPlayers: Player[] = [];
  player1: Player;
  player2: Player;

  constructor(
    protected readonly data: DataService,
    readonly text: TextService
  ) { }

  ngOnInit() {
    this.data.getPlayers().subscribe(players =>
      this.allPlayers = players);
}

  canStartGame(): boolean {
    return this.player1 != null &&
      this.player1.name != null &&
      this.player2 != null &&
      this.player2.name != null &&
      this.player1 !== this.player2;
  }

}
