import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Player } from "../player/player.model";

/**
 * Retrieves data from and updates data on the server.
 */
@Injectable()
export abstract class DataService {

  /**
   * Adds a new player
   * @param {string} playerName - The new player's name
   * @returns {Player} The newly-added player.
   */
  abstract addPlayer(playerName: string): Observable<Player>;

  /**
   * Gets a player by ID
   * @param {string} playerId - The player's ID
   * @returns {Player} The player with the given name, or null if not found.
   */
  abstract getPlayer(playerId: string): Observable<Player>;

  /**
   * Gets all of the players.
   */
  abstract getPlayers(): Observable<Player[]>;

  /**
   * Gets all of the players in descending order by win percentage.
   */
  abstract getStandings(): Observable<Player[]>;

  /**
   * Records a win for the given player.
   * @param {string} playerId - The player's ID
   */
  abstract recordWin(playerId: string): Observable<Player>;

  /**
   * Records a loss for the given player.
   * @param {string} playerId - The player's ID
   */
  abstract recordLoss(playerId: string): Observable<Player>;
}
