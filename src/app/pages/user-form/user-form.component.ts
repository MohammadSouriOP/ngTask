import {
  Component,
  ViewChildren,
  ViewChild,
  QueryList,
  OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { CommonModule } from "@angular/common";
import { MessageService } from "primeng/api";
import { InputComponent } from "../../shared/input/input.component";
import { ButtonComponent } from "../../shared/button/button.component";
import { DropdownComponent } from "../../shared/dropdown/dropdown.component";

@Component({
  selector: "app-userform",
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ButtonComponent,
    DropdownComponent,
  ],
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],

})
export class UserFormComponent implements OnInit {
  user = { name: "", username: "", phone: "", email: "", website: "" };
  address = { street: "", country: "", suite: "", zipCode: "" };
  company = { companyName: "", catchPhrase: "", business: "" };
  isEdit = false;

  @ViewChildren(InputComponent) inputs!: QueryList<InputComponent>;
  @ViewChild(DropdownComponent) dropdown!: DropdownComponent;

  constructor(
    private route: ActivatedRoute,
    public location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id === "new") {
      this.isEdit = false;
    } else {
      const stateUser = history.state.user;
      if (stateUser) {
        this.user = {
          name: stateUser.name || "",
          username: stateUser.username || "",
          phone: stateUser.phone || "",
          email: stateUser.email || "",
          website: stateUser.website || "",
        };
        this.address = {
          street: stateUser.address?.street || "",
          suite: stateUser.address?.suite || "",
          zipCode: stateUser.address?.zipcode || "",
          country: stateUser.address?.country || "",
        };
        this.company = {
          companyName: stateUser.company?.name || "",
          catchPhrase: stateUser.company?.catchPhrase || "",
          business: stateUser.company?.bs || "",
        };
        this.isEdit = true;
      }
    }
  }

  save(): void {
    let isValid = true;
    const missingFields: string[] = [];

    this.inputs.forEach((input) => {
      input.validate();
      if (input.required && !input.model?.trim()) {
        isValid = false;
        missingFields.push(input.label);
      }
    });

    this.dropdown?.validate();
    if (this.dropdown?.required && !this.address.country) {
      isValid = false;
      missingFields.push("Country");
    }

    if (!isValid) {
      this.messageService.add({
        severity: "error",
        summary: "Validation Failed",
        detail: `Please fill in: ${missingFields.join(", ")}`,
      });
      return;
    }

    const fullUser = {
      ...this.user,
      address: this.address,
      company: this.company,
    };

    this.messageService.add({
      severity: "success",
      summary: this.isEdit ? "User Updated" : "User Created",
      detail: "Operation completed successfully",
    });

    console.log(this.isEdit ? "✅ Updated user:" : "✅ Created user:", fullUser);
    setTimeout(() => this.location.back(), 1500);
  }

  cancel(): void {
    this.messageService.add({
      severity: "info",
      summary: "Canceled",
      detail: "Form canceled.",
    });

    setTimeout(() => this.location.back(), 1000);
  }
}
