import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed, inject } from "@angular/core/testing";

import { DataService } from "./data.service";
import { PlayerContract } from "../player/player-contract.interface";
import { Player } from "../player/player.model";

describe("DataService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
  });

  afterEach(
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      httpMock.verify();
    })
  );

  it(
    "should be created",
    inject([DataService], (service: DataService) => {
      expect(service).toBeTruthy();
    })
  );

  describe("Call addPlayer", () => {
    it(
      "throws an error when the name is null",
      inject([DataService], (service: DataService) => {
        service.addPlayer(null).subscribe(
          result => {},
          error => {
            expect(error).toBeDefined();
          }
        );
      })
    );

    it(
      "throws an error when the name is empty string",
      inject(
        [DataService, HttpTestingController],
        (service: DataService, httpMock: HttpTestingController) => {
          service.addPlayer("").subscribe(
            result => {},
            error => {
              expect(error).toBeDefined();
            }
          );
        }
      )
    );

    it(
      "returns the newly added player",
      inject(
        [DataService, HttpTestingController],
        (service: DataService, httpMock: HttpTestingController) => {
          const testPlayer: PlayerContract = {
            _id: "abc123",
            name: "Alice",
            wins: 0,
            losses: 0
          };
          service.addPlayer(testPlayer.name).subscribe(player => {
            expect(player).toBeDefined();
            expect(player.name).toBe(testPlayer.name);
          });
          const req = httpMock.expectOne("http://localhost:8080/api/players");
          expect(req.request.method).toEqual("POST");
          req.flush(testPlayer);
        }
      )
    );
  });

  describe("Call getPlayer", () => {
    const testPlayer: PlayerContract = {
      _id: "abc123",
      name: "Alice",
      wins: 0,
      losses: 0
    };
    const badPlayerId = "zzz456";
    it(
      "returns null if the player is not found",
      inject(
        [DataService, HttpTestingController],
        (service: DataService, httpMock: HttpTestingController) => {
          service.addPlayer(testPlayer.name).subscribe(addedPlayer => {
            service.getPlayer(badPlayerId).subscribe(player => {
              expect(player).toBeNull();
            });
          });
          const req = httpMock.expectOne("http://localhost:8080/api/players");
          expect(req.request.method).toEqual("POST");
          req.flush(testPlayer);
          const req2 = httpMock.expectOne(
            "http://localhost:8080/api/player/" + badPlayerId
          );
          expect(req2.request.method).toEqual("GET");
          req2.flush(null);
        }
      )
    );
    it(
      "returns the Player if found",
      inject(
        [DataService, HttpTestingController],
        (service: DataService, httpMock: HttpTestingController) => {
          service.addPlayer(testPlayer.name).subscribe(addedPlayer => {
            service.getPlayer(testPlayer._id).subscribe(player => {
              expect(player).toBeDefined();
              expect(player.name).toBe(testPlayer.name);
            });
          });
          const req = httpMock.expectOne("http://localhost:8080/api/players");
          expect(req.request.method).toEqual("POST");
          req.flush(testPlayer);
          const req2 = httpMock.expectOne(
            "http://localhost:8080/api/player/" + testPlayer._id
          );
          expect(req2.request.method).toEqual("GET");
          req2.flush(testPlayer);
        }
      )
    );
  });

  describe("Call getPlayers", () => {
    it(
      "initially returns no players",
      inject(
        [DataService, HttpTestingController],
        (service: DataService, httpMock: HttpTestingController) => {
          const players = [];
          service.getPlayers().subscribe(playerList => {
            expect(playerList).toBeDefined();
            expect(playerList.length).toBe(0);
          });
          const req = httpMock.expectOne("http://localhost:8080/api/players");
          expect(req.request.method).toEqual("GET");
          req.flush(players);
        }
      )
    );

    it(
      "returns players that were added",
      inject(
        [DataService, HttpTestingController],
        (service: DataService, httpMock: HttpTestingController) => {
          const players: PlayerContract[] = [
            {
              _id: "abc123",
              name: "Alice",
              wins: 0,
              losses: 0
            },
            {
              _id: "bcd135",
              name: "Bob",
              wins: 0,
              losses: 0
            }
          ];
          service.addPlayer(players[0].name).subscribe(p1 => {
            expect(p1.id).toBe(players[0]._id);
            expect(p1.name).toBe(players[0].name);
            service.addPlayer(players[1].name).subscribe(p2 => {
              expect(p2.id).toBe(players[1]._id);
              expect(p2.name).toBe(players[1].name);
              service.getPlayers().subscribe(playerList => {
                expect(playerList).toBeDefined();
                expect(playerList.length).toBe(players.length);
                expect(
                  playerList.some(p => p.id === players[0]._id)
                ).toBeTruthy();
                expect(
                  playerList.some(p => p.id === players[1]._id)
                ).toBeTruthy();
              });
            });
          });
          players.forEach(p => {
            const req = httpMock.expectOne("http://localhost:8080/api/players");
            expect(req.request.method).toEqual("POST");
            req.flush(p);
          });
          const req2 = httpMock.expectOne("http://localhost:8080/api/players");
          expect(req2.request.method).toEqual("GET");
          req2.flush(players);
        }
      )
    );
  });

  describe("Call getStandings", () => {
    it(
      "returns the players in order by win percentage",
      inject(
        [DataService, HttpTestingController],
        (service: DataService, httpMock: HttpTestingController) => {
          const gamesPlayed = 5;
          const players: PlayerContract[] = [
            {
              _id: "a1",
              name: "Alice",
              wins: 2,
              losses: 3
            },
            {
              _id: "b2",
              name: "Bob",
              wins: 1,
              losses: 4
            },
            {
              _id: "c3",
              name: "Carol",
              wins: 4,
              losses: 1
            },
            {
              _id: "d4",
              name: "Dan",
              wins: 3,
              losses: 2
            }
          ];

          players.forEach(player => {
            service.addPlayer(player.name).subscribe(() => {});
            const req = httpMock.expectOne("http://localhost:8080/api/players");
            expect(req.request.method).toEqual("POST");
            req.flush(player);
          });

          const orderedPlayers = players.sort((a, b) => b.wins - a.wins);
          service.getStandings().subscribe(standings => {
            expect(standings).toBeDefined();
            expect(standings.length).toBe(players.length);
            for (let index = 0; index < standings.length; index++) {
              const actualPlayer = standings[index];
              const expectedPlayer = orderedPlayers[index];
              expect(actualPlayer.name).toBe(expectedPlayer.name);
            }
          });
          const req2 = httpMock.expectOne("http://localhost:8080/api/players");
          expect(req2.request.method).toEqual("GET");
          req2.flush(players);
        }
      )
    );
  });

  describe("Call recordWin", () => {
    const testPlayer: PlayerContract = {
      _id: "abc123",
      name: "Alice",
      wins: 0,
      losses: 0
    };

    it(
      "increases the player's win total by 1",
      inject(
        [DataService, HttpTestingController],
        (service: DataService, httpMock: HttpTestingController) => {
          service.addPlayer(testPlayer.name).subscribe();
          service.recordWin(testPlayer._id).subscribe(updatedPlayer => {
            expect(updatedPlayer).toBeDefined();
            expect(updatedPlayer.wins).toBeDefined();
            expect(updatedPlayer.wins).toBe(testPlayer.wins + 1);
            expect(updatedPlayer.losses).toBeDefined();
            expect(updatedPlayer.losses).toBe(testPlayer.losses);
          });
          const req = httpMock.expectOne("http://localhost:8080/api/players");
          expect(req.request.method).toEqual("POST");
          req.flush(testPlayer);
          const req2 = httpMock.expectOne(
            "http://localhost:8080/api/player/" + testPlayer._id
          );
          expect(req2.request.method).toEqual("GET");
          req2.flush(testPlayer);
          const req3 = httpMock.expectOne(
            "http://localhost:8080/api/player/" + testPlayer._id
          );
          expect(req3.request.method).toEqual("PUT");
          req3.flush(<PlayerContract>{
            _id: testPlayer._id,
            name: testPlayer.name,
            wins: testPlayer.wins + 1,
            losses: testPlayer.losses
          });
        }
      )
    );
  });

  describe("Call recordLoss", () => {
    const testPlayer: PlayerContract = {
      _id: "abc123",
      name: "Alice",
      wins: 0,
      losses: 0
    };

    it(
      "increases the player's loss total by 1",
      inject(
        [DataService, HttpTestingController],
        (service: DataService, httpMock: HttpTestingController) => {
          service.addPlayer(testPlayer.name).subscribe();
          service.recordWin(testPlayer._id).subscribe(updatedPlayer => {
            expect(updatedPlayer).toBeDefined();
            expect(updatedPlayer.wins).toBeDefined();
            expect(updatedPlayer.wins).toBe(testPlayer.wins);
            expect(updatedPlayer.losses).toBeDefined();
            expect(updatedPlayer.losses).toBe(testPlayer.losses + 1);
          });
          const req = httpMock.expectOne("http://localhost:8080/api/players");
          expect(req.request.method).toEqual("POST");
          req.flush(testPlayer);
          const req2 = httpMock.expectOne(
            "http://localhost:8080/api/player/" + testPlayer._id
          );
          expect(req2.request.method).toEqual("GET");
          req2.flush(testPlayer);
          const req3 = httpMock.expectOne(
            "http://localhost:8080/api/player/" + testPlayer._id
          );
          expect(req3.request.method).toEqual("PUT");
          req3.flush(<PlayerContract>{
            _id: testPlayer._id,
            name: testPlayer.name,
            wins: testPlayer.wins,
            losses: testPlayer.losses + 1
          });
        }
      )
    );
  });
});
