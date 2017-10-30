import { Directive, EventEmitter, Output } from "@angular/core";

@Directive({
  selector: "[app-game]"
})
export class MockGameDirective {
  @Output() navigate = new EventEmitter<string>();

  constructor() {}
}
