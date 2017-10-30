import { Component, EventEmitter, OnInit, Output } from "@angular/core";

import { TextService } from "../text/text.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @Output() navigate = new EventEmitter<string>();

  constructor(protected readonly text: TextService) { }

  ngOnInit() {
  }
}
