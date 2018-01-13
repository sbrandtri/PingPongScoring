import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GameComponent } from "./game.component";
import { GameService } from "./game.service";
import { DataService } from "../data";
import { PlayerScore } from "../player";
import { TextService } from "../text";

describe("GameComponent", () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let mockGameService: any;
  const player1 = PlayerScore.create("Alice");
  const player2 = PlayerScore.create("Bob");
  const players: PlayerScore[] = [ player1, player2 ];

  beforeEach(
    async(() => {
      mockGameService = jasmine.createSpyObj(
        "mockGameService",
        [
          "awardPoint", "getPlayers", "getStatus", "isGameOver",
          "player1", "player2", "reset", "saveResult"
        ]);
      mockGameService.getPlayers.and.returnValue(players);
      mockGameService.isGameOver.and.returnValue(false);
      mockGameService.player1.and.returnValue(player1);
      mockGameService.player2.and.returnValue(player2);

      TestBed.configureTestingModule({
        declarations: [ GameComponent ],
        providers: [
          TextService,
          { provide: GameService, useValue: mockGameService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
