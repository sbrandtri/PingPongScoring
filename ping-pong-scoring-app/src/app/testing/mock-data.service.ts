import { Injectable } from "@angular/core";
import { Observable, of as observableOf } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

import { DataService } from "../data/data.service";
import { Player } from "../player/player.model";
import { PlayerContract } from "../player/player-contract.interface";

/**
 * Mock implementation of the DataService
 */
@Injectable()
export class MockDataService implements DataService {
  private players: Player[] = [];
  private nextId = 1;

  calledRecordLoss = 0;
  calledRecordWin = 0;

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
    const newPlayer = this.mapContract(<PlayerContract>{ _id: this.getNextId(), name: playerName });
    this.players.push(newPlayer);
    return observableOf(newPlayer);
  }

  /**
   * Gets a player by name
   * @param {string} playerId - The player's ID
   * @returns {Player} The player with the given name, or null if not found.
   */
  getPlayer(playerId: string): Observable<Player> {
    return observableOf(this.players.find(p => p.id === playerId));
  }

  /**
   * Gets all of the players.
   */
  getPlayers(): Observable<Player[]> {
    return observableOf(this.players);
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
    this.calledRecordWin++;
    return this.getPlayer(playerId).pipe(mergeMap(player => {
      player.recordWin();
      return observableOf(player);
    }));
  }

  /**
   * Records a loss for the given player.
   * @param {string} playerId - The player's ID
   */
  recordLoss(playerId: string): Observable<Player> {
    this.calledRecordLoss++;
    return this.getPlayer(playerId).pipe(mergeMap(player => {
      player.recordLoss();
      return observableOf(player);
    }));
  }

  /**
   * Resets the mock service, initializing all internal data
   */
  reset(): void {
    this.calledRecordLoss = 0;
    this.calledRecordWin = 0;
    this.players = [];
  }

  /**
   * Maps a PlayerContract to a Player
   */
  private mapContract(contract: PlayerContract): Player {
    return new Player(contract);
  }

  /**
   * Gets the next ID value
   */
  private getNextId(): string {
    return (this.nextId++).toString();
  }
}
