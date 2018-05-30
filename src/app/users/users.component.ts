import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  successMessage = '';
  deleteMessage = '';
  constructor(private service : UsersService) { }

  ngOnInit() {
    this.service.userCreated$.subscribe(user =>{
      this.successMessage = `${user.name} has been created!`;
      this.clearMessages();
    });

    this.service.userDeleted$.subscribe(() => {
      this.deleteMessage = `The user has been deleted`;
      this.clearMessages();
    });
  }

  clearMessages() {
    setTimeout(() => {
      this.successMessage = '';
    this.deleteMessage = '';
    }, 5000);
    
  }

}
