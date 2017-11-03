import { Component, EventEmitter, OnInit, Output } from "@angular/core";

import { DataService } from "../data/data.service";
import { Player } from "../player/player.model";
import { TextService } from "../text/text.service";

@Component({
  selector: "app-standings",
  templateUrl: "./standings.component.html",
  styleUrls: ["./standings.component.scss"]
})
export class StandingsComponent implements OnInit {
  @Output() navigate = new EventEmitter<string>();

  protected standings: Player[] = [];

  constructor(
    protected readonly data: DataService,
    protected readonly text: TextService
  ) { }

  ngOnInit() {
    this.data.getStandings().subscribe(standings => this.standings = standings);
  }

  displayPercentage(pct: number): string {
    return (Math.round(pct * 1000) / 1000).toFixed(3);
  }
}
