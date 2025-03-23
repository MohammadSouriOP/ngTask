import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InputComponent } from '../../shared/input/input.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  user: any = {
    name: '',
    email: '',
    company: {
      name: '',
    },
  };

  isEdit: boolean = false;

  constructor(private route: ActivatedRoute, public location: Location) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.isEdit = false;
    } else {
      this.user = history.state.user || {};
      this.isEdit = true;
    }
  }

  save() {
    if (this.isEdit) {
      console.log('Updated user:', this.user);
    } else {
      console.log('Created user:', this.user);
    }
    this.location.back();
  }
}
