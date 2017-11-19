import { Player } from "./player.model";
import { PlayerContract } from "./player-contract.interface";

export class PlayerScore extends Player {
  private _score = 0;
  private _serving = false;

  /**
   * Create a Player
   * @param {string} name - The player's name.
   * @param {number} wins - The number of wins for this player (defaults to 0)
   * @param {number} losses - The number of losses for this player (defaults to 0)
   */
  static create(
    name: string,
    wins: number = 0,
    losses: number = 0
  ): PlayerScore {
    const player = new Player(<PlayerContract>{
      name: name,
      wins: wins,
      losses: losses
    });
    return PlayerScore.extend(player);
  }

  static extend(player: Player): PlayerScore {
    const score = new PlayerScore(player.getContract());
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
