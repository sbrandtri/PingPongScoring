import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { StandingsComponent } from "./standings.component";
import { DataService } from "../data/data.service";
import { TextService } from "../text/text.service";
import { MockDataService } from "../testing/mock-data.service";

describe("StandingsComponent", () => {
  let component: StandingsComponent;
  let fixture: ComponentFixture<StandingsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StandingsComponent],
        providers: [
          { provide: DataService, useClass: MockDataService },
          TextService
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
