import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';  // required for @ViewChildren
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    MenuModule,
    ConfirmDialogModule,
    ButtonComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, AfterViewInit {
  public users: any[] = [];
  public selectedUser: any;
  public menuItems: MenuItem[] = [];

  @ViewChildren('menuRef') menuRefs!: QueryList<Menu>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    this.menuItems = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editUser(this.selectedUser),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.confirmDelete(this.selectedUser),
      },
    ];
  }

  ngAfterViewInit(): void {
    console.log('Menus ready:', this.menuRefs.length);
  }

  loadUsers() {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((data) => {
        this.users = data;
        console.log('Users loaded:', data);
      });
  }

  createUser() {
    this.router.navigate(['/create']);
  }

  editUser(user: any) {
    this.router.navigate(['/edit', user.id], { state: { user } });
  }

  openMenu(event: MouseEvent, user: any, rowIndex: number) {
    event.stopPropagation();
    this.selectedUser = user;

    // Find the menu by row index
    const menu = this.menuRefs.toArray()[rowIndex]; 
    if (menu) {
      menu.toggle(event); // Toggle the menu when clicked
    }
  }

  confirmDelete(user: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.name}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter((u) => u.id !== user.id);
        console.log('User deleted:', user);
      },
    });
  }
}
