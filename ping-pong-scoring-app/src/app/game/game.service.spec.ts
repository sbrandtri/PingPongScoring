import { TestBed, inject } from "@angular/core/testing";

import { GameService } from "./game.service";
import { DataService } from "../data/data.service";
import { Player } from "../player/player.model";
import { PlayerScore } from "../player/player-score.model";

describe("GameService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, GameService]
    });
  });

  it("should be created", inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));

  describe("Call start with player1 null", () => {
    it("should throw an error", inject([GameService], (service: GameService) => {
      const player2 = new Player("brady");
      expect(() => service.start([null, player2])).toThrowError();
    }));
  });

  describe("Call start with player2 null", () => {
    it("should throw an error", inject([GameService], (service: GameService) => {
      const player1 = new Player("brady");
      expect(() => service.start([player1, null])).toThrowError();
    }));
  });

  describe("Call start with 2 valid players", () => {
    it("should start with no score and player1 serving", inject([GameService], (service: GameService) => {
      const player1 = new Player("brady");
      const player2 = new Player("bill");
      service.start([player1, player2]);
      expect(service.getPlayers().every(p => p.score === 0)).toBeTruthy();
      expect(service.nowServing().name).toBe(player1.name);
    }));
  });

  describe("Call start on an already started game", () => {
    it("should throw an error", inject([GameService], (service: GameService) => {
      const player1 = new Player("brady");
      const player2 = new Player("bill");
      service.start([player1, player2]);
      expect(() => service.start([player1, player2])).toThrowError();
    }));
  });

  describe("Call awardPoint with a null player", () => {
    it("should throw an error", inject([GameService], (service: GameService) => {
      expect(() => service.awardPoint(null)).toThrowError();
    }));
  });

  describe("Call awardPoint with an blank playerName", () => {
    it("should throw an error", inject([GameService], (service: GameService) => {
      expect(() => service.awardPoint(new PlayerScore(""))).toThrowError();
    }));
  });

  describe("Call awardPoint with a valid playerName for a game that hasn't started", () => {
    it("should throw an error", inject([GameService], (service: GameService) => {
      expect(() => service.awardPoint(new PlayerScore("brady"))).toThrowError();
    }));
  });

  describe("Call awardPoint with a player who is not in the game", () => {
    it("should throw an error", inject([GameService], (service: GameService) => {
      const player1 = new Player("brady");
      const player2 = new Player("bill");
      service.start([player1, player2]);
      expect(() => service.awardPoint(new PlayerScore("tom"))).toThrowError();
    }));
  });

  describe("Call awardPoint for player 1", () => {
    it("should increment player 1's points", inject([GameService], (service: GameService) => {
      const player1 = new PlayerScore("brady");
      const player2 = new PlayerScore("bill");
      service.start([player1, player2]);
      service.awardPoint(player1);
      expect(() => service.awardPoint(new PlayerScore("tom"))).toThrowError();
    }));
  });
});
