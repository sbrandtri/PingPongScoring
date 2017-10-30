import { Player } from './player.model';

export class PlayerScore extends Player {
  private _score = 0;
  private _serving = false;

  static extend(player: Player): PlayerScore {
    const score = new PlayerScore(player.name, player.wins, player.losses);
    return score;
  }

  get score(): number {
    return this._score;
  }

  get isServing(): boolean {
    return this._serving;
  }

  awardPoint(): void {
    this._score++;
  }

  changeServe(isServing: boolean): void {
    this._serving = isServing;
  }
}
