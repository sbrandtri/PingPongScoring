import { NO_ERRORS_SCHEMA } from "@angular/core";
import { DebugElement } from "@angular/core/src/debug/debug_node";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import {
  NgbModule,
  NgbPopover,
  NgbPopoverConfig
} from "@ng-bootstrap/ng-bootstrap";

import { DataService } from "../data/data.service";
import { Player } from "../player/player.model";
import { SelectPlayerComponent } from "./select-player.component";
import { MockDataService } from "../testing/mock-data.service";
import { TextService } from "../text/text.service";

describe("SelectPlayerComponent", () => {
  let component: SelectPlayerComponent;
  let fixture: ComponentFixture<SelectPlayerComponent>;
  let expectedPlayers: Player[];
  let playerEl: DebugElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SelectPlayerComponent],
        imports: [NgbModule.forRoot()],
        providers: [
          { provide: DataService, useClass: MockDataService },
          TextService,
          NgbPopoverConfig
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPlayerComponent);
    component = fixture.componentInstance;
    playerEl = fixture.debugElement.query(By.css("#player"));

    // pretend that it was wired to something that provided an allPlayers array
    expectedPlayers = [
      Player.create("Alice", 2, 0),
      Player.create("Bob", 1, 1),
      Player.create("Carol", 0, 2)
    ];

    component.allPlayers = expectedPlayers;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should contain no players in dropdown, if not passed", () => {
    component.allPlayers = [];
    fixture.detectChanges();

    expect(playerEl.nativeElement.options.length).toBe(1);
    expect(playerEl.nativeElement.options[0].value).toBe("");
  });

  it("should contain all players in dropdown, if passed", () => {
    expect(playerEl.nativeElement.options.length).toBe(
      expectedPlayers.length + 1
    );
    expect(playerEl.nativeElement.options[0].value).toBe("");
    for (let i = 0; i < expectedPlayers.length; i++) {
      expect(playerEl.nativeElement.options[i + 1].value).toBe(
        expectedPlayers[i].name
      );
    }
  });

  it("should reflect an added player", () => {
    const newPlayerName = "Dan";
    component.addPlayer(newPlayerName);
    fixture.detectChanges();

    const optionsLength = expectedPlayers.length + 1;
    expect(playerEl.nativeElement.options.length).toBe(optionsLength);
    expect(playerEl.nativeElement.options[optionsLength - 1].value).toBe(
      newPlayerName
    );
  });
});
