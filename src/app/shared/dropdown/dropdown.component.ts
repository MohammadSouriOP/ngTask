import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-dropdown",
  standalone: true,
  imports: [DropdownModule, FormsModule, CommonModule],
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"],
})
export class DropdownComponent {
  @Input() selectedCountry: any;
  @Output() selectedCountryChange = new EventEmitter<any>();
  @Input() required: boolean = false;

  errorMessage: string = "";

  countries = [
    { label: "Jordan", value: "JO" },
    { label: "United States", value: "US" },
    { label: "Germany", value: "DE" },
    { label: "France", value: "FR" },
    { label: "United Kingdom", value: "UK" },
    { label: "Canada", value: "CA" },
    { label: "Australia", value: "AU" },
    { label: "Italy", value: "IT" },
    { label: "Spain", value: "ES" },
    { label: "Netherlands", value: "NL" },
  ];

  validate(): void {
    if (this.required && !this.selectedCountry) {
      this.errorMessage = "Country is required";
    } else {
      this.errorMessage = "";
    }
  }
}
