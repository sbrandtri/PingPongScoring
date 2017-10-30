import { Injectable } from "@angular/core";

@Injectable()
export class TextService {

  constructor() { }

  readonly appTitle = "Ping Pong Scoring";

  readonly buttons = {
    addPlayer: "+ Player",
    awardPoint: "+1",
    cancel: "Cancel",
    home: "Back to Home",
    newGame: "New Game",
    ok: "OK",
    quit: "Quit Game",
    save: "Save Result",
    standings: "Standings",
    startGame: "Start Game"
  };

  readonly labels = {
    losses: "L",
    percentage: "Pct",
    player: "Player",
    playerName: "Player Name",
    wins: "W"
  };

  readonly messages = {
    home: "Check out the current standings or start a new game!",
    selectPlayers: "Select the players for this game."
  };

  readonly pages = {
    game: "Game",
    home: "Home",
    standings: "Standings",
    startGame: "Start Game"
  };
}
