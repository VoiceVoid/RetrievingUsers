import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {username: '', password: ''};
  successMessage = '';
  deleteMessage = '';
  constructor(private service : AuthService,private router: Router) { }

  ngOnInit() {
  }



  login(){
    this.deleteMessage = ''
    this.service.login(this.credentials.username, this.credentials.password)
    .subscribe(
      data => {
        this.router.navigate(['']);
        console.log(data);
      },
      err => {
        this.deleteMessage = err;
        console.log(err);
      }
    )
  }

}
