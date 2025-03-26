import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
})
export class InputComponent {
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() required: boolean = false;
  @Input() model: string = "";
  @Output() modelChange = new EventEmitter<string>();

  errorMessage: string = "";

  validate(): void {
    if (this.required && !this.model?.trim()) {
      this.errorMessage = `${this.label} is required`;
    } else {
      this.errorMessage = "";
    }
  }

  onInputChange(): void {
    this.modelChange.emit(this.model);
    this.validate();
  }
}
