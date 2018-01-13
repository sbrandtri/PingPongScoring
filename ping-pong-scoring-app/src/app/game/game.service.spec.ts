import { TestBed, inject } from "@angular/core/testing";

import { GameService } from "./game.service";
import { DataService } from "../data";
import { PlayerContract, Player, PlayerScore } from "../player";
import { MockDataService } from "../testing";

describe("GameService", () => {
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     providers: [
  //       { provide: DataService, useClass: MockDataService },
  //       GameService
  //     ]
  //   });
  // });

  it("should be created", //   expect(service).toBeTruthy(); // inject([GameService], (service: GameService) => {
  // })
  () => {
    const service = new GameService(new MockDataService());
    expect(service).toBeTruthy();
  });

  describe("Call start with only 1 player", () => {
    it("should throw an error", //   const player = Player.create("brady"); // inject([GameService], (service: GameService) => {
    //   expect(() => service.start([player])).toThrowError();
    // })
    () => {
      const service = new GameService(new MockDataService());
      const player = Player.create("brady");
      expect(() => service.start([player])).toThrowError();
    });
  });

  describe("Call start with player1 null", () => {
    it("should throw an error", //   const player2 = Player.create("brady"); // inject([GameService], (service: GameService) => {
    //   expect(() => service.start([null, player2])).toThrowError();
    // })
    () => {
      const service = new GameService(new MockDataService());
      const player2 = Player.create("brady");
      expect(() => service.start([null, player2])).toThrowError();
    });
  });

  describe("Call start with player2 null", () => {
    it("should throw an error", //   const player1 = Player.create("brady"); // inject([GameService], (service: GameService) => {
    //   expect(() => service.start([player1, null])).toThrowError();
    // })
    () => {
      const service = new GameService(new MockDataService());
      const player1 = Player.create("brady");
      expect(() => service.start([player1, null])).toThrowError();
    });
  });

  describe("Call start with 2 valid players", () => {
    it("should start with no score and player1 serving", //   const player1 = Player.create("brady"); // inject([GameService], (service: GameService) => {
    //   const player2 = Player.create("bill");
    //   service.start([player1, player2]);
    //   expect(service.player1.name).toBe(player1.name);
    //   expect(service.player2.name).toBe(player2.name);
    //   expect(service.getPlayers().every(p => p.score === 0)).toBeTruthy();
    //   expect(service.nowServing().name).toBe(player1.name);
    // })
    () => {
      const service = new GameService(new MockDataService());
      const player1 = Player.create("brady");
      const player2 = Player.create("bill");
      service.start([player1, player2]);
      expect(service.player1.name).toBe(player1.name);
      expect(service.player2.name).toBe(player2.name);
      expect(service.getPlayers().every(p => p.score === 0)).toBeTruthy();
      expect(service.nowServing().name).toBe(player1.name);
    });
  });

  describe("Call start on an already started game", () => {
    it("should throw an error", //   const player1 = Player.create("brady"); // inject([GameService], (service: GameService) => {
    //   const player2 = Player.create("bill");
    //   service.start([player1, player2]);
    //   expect(() => service.start([player1, player2])).toThrowError();
    // })
    () => {
      const service = new GameService(new MockDataService());
      const player1 = Player.create("brady");
      const player2 = Player.create("bill");
      service.start([player1, player2]);
      expect(() => service.start([player1, player2])).toThrowError();
    });
  });

  describe("Call awardPoint with a null player", () => {
    it("should throw an error", //   expect(() => service.awardPoint(null)).toThrowError(); // inject([GameService], (service: GameService) => {
    // })
    () => {
      const service = new GameService(new MockDataService());
      expect(() => service.awardPoint(null)).toThrowError();
    });
  });

  describe("Call awardPoint with an blank playerName", () => {
    it("should throw an error", //   expect(() => service.awardPoint(PlayerScore.create(""))).toThrowError(); // inject([GameService], (service: GameService) => {
    // })
    () => {
      const service = new GameService(new MockDataService());
      expect(() => service.awardPoint(PlayerScore.create(""))).toThrowError();
    });
  });

  describe("Call awardPoint with a valid playerName for a game that hasn't started", () => {
    it("should throw an error", //   expect(() => // inject([GameService], (service: GameService) => {
    //     service.awardPoint(PlayerScore.create("brady"))
    //   ).toThrowError();
    // })
    () => {
      const service = new GameService(new MockDataService());
      expect(() =>
        service.awardPoint(PlayerScore.create("brady"))
      ).toThrowError();
    });
  });

  describe("Call awardPoint with a player who is not in the game", () => {
    it("should throw an error", //   const player1 = Player.create("brady"); // inject([GameService], (service: GameService) => {
    //   const player2 = Player.create("bill");
    //   service.start([player1, player2]);
    //   expect(() =>
    //     service.awardPoint(PlayerScore.create("tom"))
    //   ).toThrowError();
    // })
    () => {
      const service = new GameService(new MockDataService());
      const player1 = Player.create("brady");
      const player2 = Player.create("bill");
      service.start([player1, player2]);
      expect(() =>
        service.awardPoint(PlayerScore.create("tom"))
      ).toThrowError();
    });
  });

  describe("Call awardPoint for player 1", () => {
    it("should increment player 1's points", //   const player1 = PlayerScore.create("brady"); // inject([GameService], (service: GameService) => {
    //   const player2 = PlayerScore.create("bill");
    //   service.start([player1, player2]);
    //   service.awardPoint(player1);
    //   expect(player1.score).toBe(1);
    //   service.awardPoint(player1);
    //   expect(player1.score).toBe(2);
    // })
    () => {
      const service = new GameService(new MockDataService());
      const player1 = PlayerScore.create("brady");
      const player2 = PlayerScore.create("bill");
      service.start([player1, player2]);
      service.awardPoint(player1);
      expect(player1.score).toBe(1);
      service.awardPoint(player1);
      expect(player1.score).toBe(2);
    });
  });

  describe("Call saveResult for unfinished game", () => {
    it("should throw an error", //   const player1 = PlayerScore.create("brady"); // inject([GameService], (service: GameService) => {
    //   const player2 = PlayerScore.create("bill");
    //   service.start([player1, player2]);
    //   expect(() => service.saveResult()).toThrowError();
    // })
    () => {
      const service = new GameService(new MockDataService());
      const player1 = PlayerScore.create("brady");
      const player2 = PlayerScore.create("bill");
      service.start([player1, player2]);
      expect(() => service.saveResult()).toThrowError();
    });
  });

  describe("Call saveResult for finished game", () => {
    it("should not throw an error", //   const players = [ // inject([GameService], (service: GameService) => {
    //     PlayerScore.create("brady"),
    //     PlayerScore.create("bill")
    //   ];
    //   service.start(players);

    //   const player1 = service.getPlayers()[0];
    //   const maxIterations = 100;
    //   let numIterations = 0;
    //   while (!service.isGameOver()) {
    //     service.awardPoint(player1);
    //     if (++numIterations >= maxIterations) {
    //       throw new Error("Max iterations reached");
    //     }
    //   }

    //   service.saveResult();

    //   const dataService = fixture.debugElement.injector.get(DataService);
    //   const mockDataService = <MockDataService>dataService;
    //   expect(mockDataService.calledRecordWin).toBe(1);
    //   expect(mockDataService.calledRecordLoss).toBe(1);
    // })
    () => {
      const dataService = new MockDataService();
      const service = new GameService(dataService);
      const players: Player[] = [];

      dataService
        .addPlayer("brady")
        .subscribe(player => players.push(player));
      dataService
        .addPlayer("bill")
        .subscribe(player => players.push(player));

      expect(players.length).toBe(2);
      service.start(players);

      const player1 = service.getPlayers()[0];
      const maxIterations = 100;
      let numIterations = 0;
      while (!service.isGameOver()) {
        service.awardPoint(player1);
        if (++numIterations >= maxIterations) {
          throw new Error("Max iterations reached");
        }
      }

      service.saveResult();

      expect(dataService.calledRecordWin).toBe(1);
      expect(dataService.calledRecordLoss).toBe(1);
    });
  });
});
