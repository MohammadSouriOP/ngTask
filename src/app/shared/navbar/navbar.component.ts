import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  items = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'Users', icon: 'pi pi-users' },
    { label: 'Settings', icon: 'pi pi-cog' },
  ];
}
