import { Component, OnInit } from "@angular/core";
import { NgModel } from "@angular/forms";

import { GameService } from "./game/game.service";
import { Player } from "./player/player.model";
import { TextService } from "./text/text.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  pages = [
    { name: this.text.pages.home, visible: true },
    { name: this.text.pages.standings, visible: false },
    { name: this.text.pages.startGame, visible: false },
    { name: this.text.pages.game, visible: false }
  ];

  constructor(
    protected readonly game: GameService,
    protected readonly text: TextService
  ) {}

  ngOnInit(): void {}

  get currentPage(): string {
    return this.pages.filter(p => p.visible)[0].name;
  }

  navigate(page: string) {
    if (this.pages.some(p => p.name === page)) {
      this.pages.forEach(p => (p.visible = p.name === page));
    }
  }

  start(players: Player[]) {
    this.game.start(players);
    this.navigate(this.text.pages.game);
  }
}
