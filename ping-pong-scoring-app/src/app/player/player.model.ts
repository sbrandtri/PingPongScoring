import { PlayerContract } from "./player-contract.interface";

/** Class representing a player */
export class Player {
  private readonly _id: string;
  private readonly _name: string;
  private _wins = 0;
  private _losses = 0;

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
  ): Player {
    return new Player(<PlayerContract>{
      name: name,
      wins: wins,
      losses: losses
    });
  }

  /** Create a Player
   * @param {PlayerContract} player - A player contract
   */
  constructor(player: PlayerContract) {
    this._id = player._id;
    this._name = player.name;
    this._wins = player.wins;
    this._losses = player.losses;
  }

  /**
   * Gets the player's ID.
   * @returns {string} The player's ID.
   */
  get id(): string {
    return this._id;
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
  get winPercentage(): number {
    return this.gamesPlayed === 0 ? 0 : this.wins / this.gamesPlayed;
  }

  getContract(): PlayerContract {
    return <PlayerContract>{
      _id: this.id,
      name: this.name,
      wins: this.wins,
      losses: this.losses
    };
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
