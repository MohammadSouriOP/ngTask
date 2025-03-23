import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() class?: string;
  @Input() severity?:
    | 'success'
    | 'info'
    | 'warn'
    | 'danger'
    | 'help'
    | 'primary'
    | 'secondary'
    | 'contrast'
    | null;

  @Input() disabled?: boolean;
  @Input() iconPos: 'left' | 'right' = 'left';
  @Input() type: 'button' | 'submit' = 'button';
  @Output() click = new EventEmitter<MouseEvent>();
  onClick(event: MouseEvent) {
    this.click.emit(event);
  }
}
