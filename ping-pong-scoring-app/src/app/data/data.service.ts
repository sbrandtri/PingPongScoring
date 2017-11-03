import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";

import { Player } from "../player/player.model";

/**
 * Retrieves data from and updates data on the server.
 */
@Injectable()
export class DataService {

  // Mock player data until server is available
  // private static players: Player[] = [
  //   new Player("Mark", 3, 0),
  //   new Player("Jacob", 2, 1),
  //   new Player("Larry", 1, 2)
  // ];
  // private get players(): Player[] {
  //   return DataService.players;
  // }
  private players: Player[] = [];

  /**
   * Creates a new instance of the DataService
   */
  constructor() { }

  /**
   * Adds a new player
   * @param {string} playerName - The new player's name
   * @returns {Player} The newly-added player.
   */
  addPlayer(playerName: string): Observable<Player> {
    if (playerName == null || playerName.length === 0) {
      return Observable.throw(new RangeError("Player name must be specified."));
    }
    if (this.players.some(p => p.name === playerName)) {
      return Observable.throw(new RangeError("Player already exists. Try a different name."));
    }

    const newPlayer = new Player(playerName);
    this.players.push(newPlayer);
    return Observable.of(newPlayer);
  }

  /**
   * Gets a player by name
   * @param {string} playerName - The player's name
   * @returns {Player} The player with the given name, or null if not found.
   */
  getPlayer(playerName: string): Observable<Player> {
    const selectedPlayers = this.players.filter(p => p.name === playerName);
    const player = selectedPlayers.length > 0 ? selectedPlayers[0] : null;
    return Observable.of(player);
  }

  /**
   * Gets all of the players.
   */
  getPlayers(): Observable<Player[]> {
    const players: Player[] = [];
    this.players.forEach(p => players.push(p));
    return Observable.of(players);
  }

  /**
   * Gets all of the players in descending order by win percentage.
   */
  getStandings(): Observable<Player[]> {
    return Observable.of(this.players.sort((a, b) => b.winPercentage - a.winPercentage));
  }

  /**
   * Records a win for the given player.
   * @param {string} playerName - The player's name
   */
  recordWin(playerName: string): Observable<Player> {
    const player = this.players.find(p => p.name === playerName);
    player.recordWin();
    return Observable.of(player);
  }

  /**
   * Records a loss for the given player.
   * @param {string} playerName - The player's name
   */
  recordLoss(playerName: string): Observable<Player> {
    const player = this.players.find(p => p.name === playerName);
    player.recordLoss();
    return Observable.of(player);
  }
}
