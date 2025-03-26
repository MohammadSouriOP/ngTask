import { Component, EventEmitter, Output } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.css"],
})
export class SidebarComponent {
  @Output() toggleUsers = new EventEmitter<void>();

  toggle() {
    this.toggleUsers.emit();
  }
  
}
