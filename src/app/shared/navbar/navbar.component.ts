import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Menubar } from "primeng/menubar";
import { BadgeModule } from "primeng/badge";
import { AvatarModule } from "primeng/avatar";
import { InputTextModule } from "primeng/inputtext";
import { CommonModule } from "@angular/common";
import { Ripple } from "primeng/ripple";
import { FormsModule } from "@angular/forms";
import { SearchService } from "../../services/search-service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    Menubar,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    Ripple,
    CommonModule,
    FormsModule,
  ],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  searchText: any = "";

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.items = [
      {
        label: "Home",
        icon: "pi pi-home",
      },
      {
        label: "Projects",
        icon: "pi pi-search",
        badge: "3",
        items: [
          {
            label: "Core",
            icon: "pi pi-bolt",
            shortcut: "⌘+S",
          },
          {
            label: "Blocks",
            icon: "pi pi-server",
            shortcut: "⌘+B",
          },
          {
            separator: true,
          },
          {
            label: "UI Kit",
            icon: "pi pi-pencil",
            shortcut: "⌘+U",
          },
        ],
      },
    ];
  }

  onSearch() {
    this.searchService.setSearchTerm(this.searchText); // ✅ emit to the global search observable
  }
}
