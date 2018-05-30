import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  successMessage = '';
  errorMessage = '';
  constructor(private service: UsersService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    this.service.getUser(id).subscribe(user => this.user = user);
  }

  updateUser() {
    this.successMessage = '';
    this.errorMessage = '';
    this.service.updateUser(this.user)
    .subscribe(
      user => {
      console.log('user was updated');
      this.successMessage = 'User was updated';
    },
    err => {
      this.errorMessage = 'User could not be updated';
      console.error(err);

    }
  );
  }
}
