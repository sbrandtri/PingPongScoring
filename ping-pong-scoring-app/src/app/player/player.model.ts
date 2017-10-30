/** Class representing a player */
export class Player {

  private readonly _name: string;
  private _wins = 0;
  private _losses = 0;

  /**
   * Create a Player
   * @param {string} name - The player's name.
   * @param {number} wins - The number of wins for this player (defaults to 0)
   * @param {number} losses - The number of losses for this player (defaults to 0)
   */
  constructor(name: string, wins: number = 0, losses: number = 0) {
    this._name = name;
    this._wins = wins;
    this._losses = losses;
  }

  /**
   * Gets the player's name.
   * @returns {string} The player's name.
   */
  get name(): string {
    return this._name;
  }

  /**
   * Gets the number of wins.
   * @returns {number} The number of wins.
   */
  get wins(): number {
    return this._wins;
  }

  /**
   * Gets the number of losses.
   * @returns {number} The number of losses.
   */
  get losses(): number {
    return this._losses;
  }

  /**
   * Gets the number of games played.
   * @returns {number} The number of games played.
   */
  get gamesPlayed(): number {
    return this._wins + this._losses;
  }

  /**
   * Gets the player's win percentage.
   * @returns {number} The player's win percentage.
   */
  get winPercentage(): string {
    const pct =  this.gamesPlayed === 0 ? 0 : this.wins / this.gamesPlayed;
    return (Math.round(pct * 1000) / 1000).toFixed(3);
  }

  /**
   * Records a win for this player.
   */
  recordWin(): void {
    this._wins++;
  }

  /**
   * Records a loss for this player.
   */
  recordLoss(): void {
    this._losses++;
  }
}
