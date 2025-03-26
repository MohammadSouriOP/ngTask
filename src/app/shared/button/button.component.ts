import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() class?: string;
  @Input() style?: string | { [klass: string]: any };
  @Input() severity?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warn'
    | 'danger'
    | 'help'
    | 'contrast'
    | null;
  @Input() disabled: boolean = false;

  @Output() click = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    this.click.emit(event);
  }
}
