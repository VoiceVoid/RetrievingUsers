import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  constructor(private service: UsersService) { }

  ngOnInit() {
    this.service.getUsers()
    .subscribe(users => {
      console.log(users);
      this.users = users;

    });
  }

}
