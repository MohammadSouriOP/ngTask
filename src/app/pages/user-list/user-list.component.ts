import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { Router } from "@angular/router";
import { UserService } from "../../services/user-service";
import { ButtonComponent } from "../../shared/button/button.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { SearchService } from "../../services/search-service";

@Component({
  selector: "app-userlist",
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ButtonComponent,
    ProgressSpinnerModule,
  ],
  providers: [ConfirmationService],
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  allUsers: any[] = [];
  loading: boolean = true;
  searchTerm: string = "";

  constructor(
    private userService: UserService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadUsers();
    }, 2000);

    this.searchService.searchTerm$.subscribe((term) => {
      this.searchTerm = term;
      this.applyFilter();
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: any[]) => {
        this.allUsers = data;
        this.users = [...data];
        this.loading = false;
        console.log("Users loaded:", this.users);
      },
      error: (err) => {
        console.error("Error loading users:", err);
        this.loading = false;
      },
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.users = [...this.allUsers];
      return;
    }

    this.users = this.allUsers.filter(
      (user) =>
        user.name?.toLowerCase().includes(term) ||
        user.username?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term)
    );
  }

  createUser(): void {
    this.router.navigate(["/create"]);
  }

  editUser(user: any): void {
    this.router.navigate(["/edit", user.id], { state: { user } });
  }

  confirmDelete(user: any): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.name}?`,
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.allUsers = this.allUsers.filter((u) => u.id !== user.id);
        this.applyFilter();
        console.log("User deleted:", user);
      },
    });
  }
}
