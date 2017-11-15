import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgbModule, NgbPopover, NgbPopoverConfig } from "@ng-bootstrap/ng-bootstrap";

import { SelectPlayerComponent } from "./select-player.component";
import { DataService } from "../data/data.service";
import { TextService } from "../text/text.service";

describe("SelectPlayerComponent", () => {
  let component: SelectPlayerComponent;
  let fixture: ComponentFixture<SelectPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPlayerComponent ],
      imports: [ NgbModule.forRoot() ],
      // TODO: Mock DataService
      providers: [ DataService, TextService, NgbPopoverConfig ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
