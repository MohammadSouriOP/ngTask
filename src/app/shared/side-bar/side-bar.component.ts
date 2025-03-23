import { Component, EventEmitter, Output } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() toggleUsers = new EventEmitter<void>();

  items: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-chart-line' },
    { label: 'Users', icon: 'pi pi-users', command: () => this.toggleUsers.emit() },
    { label: 'Settings', icon: 'pi pi-cog' },
  ];
}
