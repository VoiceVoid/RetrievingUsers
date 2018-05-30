import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.css']
})
export class UserSingleComponent implements OnInit {
  user: User;
  constructor(private route: ActivatedRoute, private service: UsersService, private router : Router) { }

  ngOnInit() {
    //grab the id from the url
    let id = this.route.snapshot.params['id'];
    //use the userservice to getUser()
    this.service.getUser(id)
    .subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }
  deleteUser(){
    this.service.deleteUser(this.user.id)
    .subscribe(data => {
      console.log('User was deleted');
      //route back to users page
    this.router.navigate(['/users']);
    });

    
  }

}
