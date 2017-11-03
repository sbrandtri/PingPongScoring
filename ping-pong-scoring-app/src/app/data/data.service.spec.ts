import { TestBed, inject } from "@angular/core/testing";

import { DataService } from "./data.service";

describe("DataService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
  });

  it(
    "should be created",
    inject([DataService], (service: DataService) => {
      expect(service).toBeTruthy();
    })
  );

  describe("Call addPlayer", () => {
    it("throws an error when the name is null", () => {
      const service = new DataService();
      service.addPlayer(null).subscribe(
        result => {},
        error => {
          expect(error).toBeDefined();
        }
      );
    });
    it("throws an error when the name is empty string", () => {
      const service = new DataService();
      service.addPlayer("").subscribe(
        result => {},
        error => {
          expect(error).toBeDefined();
        }
      );
    });
    it("returns the newly added player", () => {
      const playerName = "Alice";
      const service = new DataService();
      service.addPlayer(playerName).subscribe(player => {
        expect(player).toBeDefined();
        expect(player.name).toBe(playerName);
      });
    });
  });

  describe("Call getPlayer", () => {
    const playerName = "Alice";
    it("returns null if the player is not found", () => {
      const service = new DataService();
      service.addPlayer(playerName).subscribe(addedPlayer => {
        service.getPlayer("Bob").subscribe(player => {
          expect(player).toBeNull();
        });
      });
    });
    it("returns the Player if found", () => {
      const service = new DataService();
      service.addPlayer(playerName).subscribe(addedPlayer => {
        service.getPlayer(playerName).subscribe(player => {
          expect(player).toBeDefined();
          expect(player.name).toBe(playerName);
        });
      });
    });
  });

  describe("Call getPlayers", () => {
    it("initially returns no players", () => {
      const service = new DataService();
      service.getPlayers().subscribe(playerList => {
        expect(playerList).toBeDefined();
        expect(playerList.length).toBe(0);
      });
    });

    it("returns players that were added", () => {
      const players = ["Alice", "Bob"];
      const service = new DataService();
      service.addPlayer(players[0]).subscribe(p1 => {
        expect(p1.name).toBe(players[0]);
        service.addPlayer(players[1]).subscribe(p2 => {
          expect(p2.name).toBe(players[1]);
          service.getPlayers().subscribe(playerList => {
            expect(playerList).toBeDefined();
            expect(playerList.length).toBe(players.length);
            expect(playerList.some(p => p.name === players[0])).toBeTruthy();
            expect(playerList.some(p => p.name === players[1])).toBeTruthy();
          });
        });
      });
    });
  });

  describe("Call getStandings", () => {
    it("returns the players in order by win percentage", () => {
      const gamesPlayed = 5;
      const players = [
        {
          name: "Alice",
          wins: 2
        },
        {
          name: "Bob",
          wins: 1
        },
        {
          name: "Carol",
          wins: 4
        },
        {
          name: "Dan",
          wins: 3
        }
      ];

      const service = new DataService();
      for (let index = 0; index < players.length; index++) {
        const player = players[index];
        service.addPlayer(player.name).subscribe(() => {
          for (let gp = 0; gp < gamesPlayed; gp++) {
            if (gp < player.wins) {
              service.recordWin(player.name).subscribe();
            } else {
              service.recordLoss(player.name).subscribe();
            }
          }
        });
      }
      const orderedPlayers =
        players.sort((a, b) => b.wins - a.wins);
      service.getStandings().subscribe(standings => {
        expect(standings).toBeDefined();
        expect(standings.length).toBe(players.length);
        for (let index = 0; index < standings.length; index++) {
          const actualPlayer = standings[index];
          const expectedPlayer = orderedPlayers[index];
          expect(actualPlayer.name).toBe(expectedPlayer.name);
        }
      });
    });
  });
});
