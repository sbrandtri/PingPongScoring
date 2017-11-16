import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { Player } from "../player/player.model";
import { PlayerContract } from "../player/player-contract.interface";

/**
 * Mock implementation of the DataService
 */
@Injectable()
export class MockDataService {
  private players: Player[] = [];

  /**
   * Creates a new instance of the MockDataService
   */
  constructor() {}

  /**
   * Adds a new player
   * @param {string} playerName - The new player's name
   * @returns {Player} The newly-added player.
   */
  addPlayer(playerName: string): Observable<Player> {
    if (playerName == null || playerName.length === 0) {
      return Observable.throw(new RangeError("Player name must be specified."));
    }

    const newPlayer = this.mapContract(<PlayerContract>{ name: playerName });
    return Observable.of(newPlayer);
  }

  /**
   * Gets a player by name
   * @param {string} playerId - The player's ID
   * @returns {Player} The player with the given name, or null if not found.
   */
  getPlayer(playerId: string): Observable<Player> {
    return Observable.of(this.players.find(p => p.id === playerId));
  }

  /**
   * Gets all of the players.
   */
  getPlayers(): Observable<Player[]> {
    return Observable.of(this.players);
  }

  /**
   * Gets all of the players in descending order by win percentage.
   */
  getStandings(): Observable<Player[]> {
    return this.getPlayers().map(players =>
      players.sort((a, b) => b.winPercentage - a.winPercentage)
    );
  }

  /**
   * Records a win for the given player.
   * @param {string} playerId - The player's ID
   */
  recordWin(playerId: string): Observable<Player> {
    return this.getPlayer(playerId).flatMap(player => {
      player.recordWin();
      return Observable.of(player);
    });
  }

  /**
   * Records a loss for the given player.
   * @param {string} playerId - The player's ID
   */
  recordLoss(playerId: string): Observable<Player> {
    return this.getPlayer(playerId).flatMap(player => {
      player.recordLoss();
      return Observable.of(player);
    });
  }

  /**
   * Maps a PlayerContract to a Player
   */
  private mapContract(contract: PlayerContract): Player {
    return new Player(contract);
  }
}
