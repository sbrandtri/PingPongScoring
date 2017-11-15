import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StandingsComponent } from "./standings.component";
import { DataService } from "../data/data.service";
import { TextService } from "../text/text.service";

describe("StandingsComponent", () => {
  let component: StandingsComponent;
  let fixture: ComponentFixture<StandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandingsComponent ],
      // TODO: Mock DataService
      providers: [ DataService, TextService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
