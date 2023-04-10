import {Component, OnInit} from '@angular/core';
import {User, UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  deleteUser(_id: any) {
    this.userService.deleteUser(_id).subscribe({
      next: () => {
        this.users = this.users.filter((p) => p._id !== _id);
        alert('Deleted');
      }, error: (error) => {
        console.error(error);
        alert(JSON.stringify(error));
      }
    });
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log(this.users);
      }, error: (error) => {
        console.error(error);
        alert(JSON.stringify(error));
      }
    });
  }

  updateUser(user: User) {
    this.router.navigateByUrl('admin/update-user', {state: user}).then(() => {});
  }
}
