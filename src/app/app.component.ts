import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private service: AuthService, private router: Router){}

  ngOnInit(){
    
  }

  //we can use it as variable instead of a method
  get isLoggedIn() {
    return this.service.isLoggedIn();
  }

  logout(){
    this.service.logout();
    this.router.navigate(['/login']);
  }
}
