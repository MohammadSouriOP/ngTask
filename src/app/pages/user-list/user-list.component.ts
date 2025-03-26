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
  loading: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadUsers();
    }, 2000);
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: any[]) => {
        this.users = data;
        this.loading = false;
        console.log("Users loaded:", this.users);
      },
      error: (err) => {
        console.error("Error loading users:", err);
        this.loading = false;
      },
    });
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
        this.users = this.users.filter((u) => u.id !== user.id);
        console.log("User deleted:", user);
      },
    });
  }
}
