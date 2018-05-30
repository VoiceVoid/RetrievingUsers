import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = {name: '', username: '', avatar: ''};
  successMessage = '';
  errorMessage = '';
  constructor(private service: UsersService,private router : Router) { }

  ngOnInit() {
    console.log(this.user);
  }


  //Create user
  createUser(){
    this.successMessage = '';
    this.errorMessage = '';
  this.service.createUser(this.user).subscribe(user => {
    this.successMessage = 'User was created';
    this.router.navigate(['/users']);
    console.log('user was created');
  });
  }
}
