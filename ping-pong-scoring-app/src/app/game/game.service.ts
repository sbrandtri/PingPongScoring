import { EventEmitter, Injectable } from "@angular/core";

import { DataService } from "../data/data.service";
import { Player } from "../player/player.model";
import { PlayerScore } from "../player/player-score.model";

@Injectable()
export class GameService {
  private players: PlayerScore[];
  private status: string;

  constructor(private readonly dataService: DataService) {}

  get player1(): Player {
    return this.players == null || this.players.length < 1
      ? null
      : this.players[0];
  }

  get player2(): Player {
    return this.players == null || this.players.length < 2
      ? null
      : this.players[1];
  }

  start(players: Player[]): void {
    if (this.players != null) {
      throw new Error("The game is already started");
    }
    if (players == null || players.length !== 2) {
      throw new RangeError("Exactly 2 players must be specified");
    }
    if (players[0] == null) {
      throw new RangeError("Player 1 cannot be null");
    }
    if (players[1] == null) {
      throw new RangeError("Player 2 cannot be null");
    }

    this.players = players.map(p => PlayerScore.extend(p));
    const player1 = this.players[0];
    player1.changeServe(true);
    this.status = player1.name + " will serve first.";
  }

  awardPoint(player: PlayerScore): void {
    if (player == null) {
      throw new Error("A player must be specified");
    }
    if (this.players == null) {
      throw new Error("The game has not started");
    }
    if (!this.players.some(p => p.name === player.name)) {
      throw new Error(player.name + " is not playing in this game.");
    }

    player.awardPoint();

    if (this.isGameOver()) {
      this.status = player.name.toUpperCase() + " WINS!";
      this.players.forEach(p => p.changeServe(false));
    } else {
      let status = player.name + " scored!";
      // Switch serving players every 2 points
      const totalScore = this.players
        .map(p => p.score)
        .reduce((total, score) => total + score);
      if (totalScore % 2 === 0) {
        this.players.forEach(p => p.changeServe(!p.isServing));
        status = status + " " + this.nowServing().name + " will serve.";
      }
      this.status = status;
    }
  }

  isGameOver(): boolean {
    const winningScore = 11;
    const winningScoreDifferential = 2;
    const mercyRuleScore = 7;

    const lowestScore = this.players
      .map(p => p.score)
      .reduce((result, score) => (score < result ? score : result));
    const highestScore = this.players
      .map(p => p.score)
      .reduce((result, score) => (score > result ? score : result));

    const anyPlayerHasReachedWinningScore = highestScore >= winningScore;
    const scoreDifferentialSatisfied =
      highestScore - lowestScore >= winningScoreDifferential;
    const mercyRuleInvoked =
      highestScore === mercyRuleScore && lowestScore === 0;

    return (
      (anyPlayerHasReachedWinningScore && scoreDifferentialSatisfied) ||
      mercyRuleInvoked
    );
  }

  saveResult(): void {
    if (!this.isGameOver()) {
      throw new Error("The result cannot be saved until the game is over.");
    }

    const losingScore = this.players
      .map(p => p.score)
      .reduce((a, b) => Math.min(a, b));
    const losingPlayer = this.players.find(p => p.score === losingScore);

    const winningScore = this.players
      .map(p => p.score)
      .reduce((a, b) => Math.max(a, b));
    const winningPlayer = this.players.find(p => p.score === winningScore);

    this.dataService.recordLoss(losingPlayer.id).subscribe();
    this.dataService.recordWin(winningPlayer.id).subscribe();
  }

  getPlayers(): PlayerScore[] {
    return this.players;
  }

  nowServing(): PlayerScore {
    return this.players.find(p => p.isServing);
  }

  getStatus(): string {
    return this.status;
  }

  reset(): void {
    this.players = null;
  }
}
