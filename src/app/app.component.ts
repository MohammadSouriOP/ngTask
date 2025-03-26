import { Component } from "@angular/core";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { SidebarComponent } from "./shared/side-bar/side-bar.component";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { ToastModule } from "primeng/toast";
import { UserListComponent } from "./pages/user-list/user-list.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    CommonModule,
    RouterOutlet,
    ToastModule,
    UserListComponent
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  searchTerm: string = "";

  onSearch(term: string) {
    this.searchTerm = term;
  }
}
