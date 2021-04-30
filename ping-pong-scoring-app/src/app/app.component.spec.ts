import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";

import { AppComponent } from "./app.component";
import { GameService } from "./game/game.service";
import { TextService } from "./text/text.service";

describe("AppComponent", () => {
  let mockGameService: any;

  beforeEach(
    waitForAsync(() => {
      mockGameService = jasmine.createSpyObj("mockGameService", ["start"]);
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [
          TextService,
          { provide: GameService, useValue: mockGameService }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  it(
    "should create the app",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );

  it(
    "should start on the home page",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = <AppComponent>fixture.debugElement.componentInstance;
      expect(app.currentPage).toEqual("Home");
    })
  );

  describe("navigating to another page", () => {
    it(
      "should change the current page, if valid",
      waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = <AppComponent>fixture.debugElement.componentInstance;
        const nextPage = app.pages[1].name;
        app.navigate(nextPage);
        expect(app.currentPage).toEqual(nextPage);
      })
    );

    it(
      "should not change the current page, if not valid",
      waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = <AppComponent>fixture.debugElement.componentInstance;
        app.navigate("Bogus Page");
        expect(app.currentPage).toEqual("Home");
      })
    );
  });
});
