import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { flatMap, map } from "rxjs/operators";

import { DataService } from "./data.service";
import { Player, PlayerContract } from "../player";

/**
 * Retrieves data from and updates data on the server.
 */
@Injectable()
export class GameDataService implements DataService {
  private baseUrl = "http://localhost:8080/api/";

  /**
   * Creates a new instance of the DataService
   */
  constructor(private readonly http: HttpClient) { }

  /**
   * Adds a new player
   * @param {string} playerName - The new player's name
   * @returns {Player} The newly-added player.
   */
  addPlayer(playerName: string): Observable<Player> {
    if (playerName == null || playerName.length === 0) {
      return Observable.throw(new RangeError("Player name must be specified."));
    }

    return this.http
      .post<PlayerContract>(this.baseUrl + "players", {
        name: playerName
      })
      .pipe(map(this.mapContract));
  }

  /**
   * Gets a player by ID
   * @param {string} playerId - The player's ID
   * @returns {Player} The player with the given name, or null if not found.
   */
  getPlayer(playerId: string): Observable<Player> {
    return this.http
      .get<PlayerContract>(this.baseUrl + "player/" + playerId)
      .pipe(map(this.mapContract));
  }

  /**
   * Gets all of the players.
   */
  getPlayers(): Observable<Player[]> {
    return this.http
      .get<PlayerContract[]>(this.baseUrl + "players")
      .pipe(
        map(players => players.map(p => this.mapContract(p)))
      );
  }

  /**
   * Gets all of the players in descending order by win percentage.
   */
  getStandings(): Observable<Player[]> {
    return this.getPlayers().pipe(map(players =>
      players.sort((a, b) => b.winPercentage - a.winPercentage)
    ));
  }

  /**
   * Records a win for the given player.
   * @param {string} playerId - The player's ID
   */
  recordWin(playerId: string): Observable<Player> {
    return this.getPlayer(playerId).pipe(flatMap(player => {
      player.recordWin();
      return this.updatePlayer(player.getContract());
    }));
  }

  /**
   * Records a loss for the given player.
   * @param {string} playerId - The player's ID
   */
  recordLoss(playerId: string): Observable<Player> {
    return this.getPlayer(playerId).pipe(flatMap(player => {
      player.recordLoss();
      return this.updatePlayer(player.getContract());
    }));
  }

  /**
   * Updates a Player.
   */
  private updatePlayer(player: PlayerContract): Observable<Player> {
    return this.http
      .put<PlayerContract>(this.baseUrl + "player/" + player._id, player)
      .pipe(map(this.mapContract));
  }

  /**
   * Maps a PlayerContract to a Player
   */
  private mapContract(contract: PlayerContract): Player {
    if (contract == null || contract._id == null) {
      return null;
    }
    return new Player(contract);
  }
}
