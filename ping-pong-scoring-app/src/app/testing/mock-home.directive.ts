import { Directive, EventEmitter, Output } from "@angular/core";

@Directive({
  selector: "[app-home]"
})
export class MockHomeDirective {
  @Output() navigate = new EventEmitter<string>();

  constructor() {}
}
