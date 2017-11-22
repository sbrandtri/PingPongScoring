import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { DataService } from "../data/data.service";
import { Player } from "../player/player.model";
import { TextService } from "../text/text.service";

@Component({
  selector: "app-select-player",
  templateUrl: "./select-player.component.html",
  styleUrls: ["./select-player.component.scss"]
})
export class SelectPlayerComponent implements OnInit {
  @Input() allPlayers: Player[] = [];
  @Input()
  get selectedPlayer(): Player {
    return this.player;
  }

  @Output() selectedPlayerChange = new EventEmitter<Player>();
  set selectedPlayer(val: Player) {
    this.player = val;
    this.selectedPlayerChange.emit(this.player);
  }

  private player: Player;

  constructor(
    protected readonly data: DataService,
    readonly text: TextService
  ) {}

  ngOnInit() {
      this.allPlayers = this.sortPlayersByName(this.allPlayers);
  }

  addPlayer(name: string): void {
    this.data.addPlayer(name).subscribe(
      newPlayer => {
        this.allPlayers.push(newPlayer);
        this.allPlayers = this.sortPlayersByName(this.allPlayers);
        this.selectedPlayer = newPlayer;
      },
      error => {
        console.log(error);
      }
    );
  }

  private sortPlayersByName(players: Player[]): Player[] {
    return players.sort((a, b) => a.name.localeCompare(b.name));
  }
}
