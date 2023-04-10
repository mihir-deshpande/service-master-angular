import {Component} from '@angular/core';
import {User, UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {userTypes, userTypeValidator} from "../sign-up/sign-up.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  user: User = history.state;

  updateUserForm = new FormGroup({
    firstName: new FormControl<string>(this.user.first_name, [Validators.required]),
    lastName: new FormControl<string>(this.user.last_name, [Validators.required]),
    email: new FormControl<string>(this.user.email, [Validators.required, Validators.email]),
    password: new FormControl<string>(this.user.password, [Validators.required]),
    type: new FormControl<string>(this.user.type, [Validators.required, userTypeValidator])
  })

  constructor(private userService: UserService) { }

  updateUser() {
    if (this.updateUserForm.valid) {
      this.user = {
        _id: this.user._id,
        first_name: this.updateUserForm.value.firstName,
        last_name: this.updateUserForm.value.lastName,
        email: this.updateUserForm.value.email,
        password: this.updateUserForm.value.password,
        type: this.updateUserForm.value.type
      };
      this.userService.updateUser(this.user).subscribe({
        next: () => {
          alert('Updated');
        },
        error: (error) => {
          console.error(error);
          alert(JSON.stringify(error));
        }
      });
    } else {
      alert("Invalid form")
    }
  }

  protected readonly userTypes = userTypes;
}
