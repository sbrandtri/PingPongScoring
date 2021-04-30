import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { StartGameComponent } from "./start-game.component";
import { DataService } from "../data/data.service";
import { TextService } from "../text/text.service";
import { MockDataService } from "../testing/mock-data.service";

describe("StartGameComponent", () => {
  let component: StartGameComponent;
  let fixture: ComponentFixture<StartGameComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StartGameComponent],
        providers: [
          { provide: DataService, useClass: MockDataService },
          TextService
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
