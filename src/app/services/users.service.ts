import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { User } from '../models/user';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class UsersService {
private usersUrl = 'https://reqres.in/api/users';

//observable source
private userCreatedSource = new Subject<User>();
private userDeletedSource = new Subject();

//observable stream
userCreated$ = this.userCreatedSource.asObservable();
userDeleted$ = this.userDeletedSource.asObservable();

  constructor(private http: Http) { }
  
  // also show what this method will return
  //Get All Users
  getUsers(): Observable<User[]> {
    // retrieve data we want with map
    return this.http.get(this.usersUrl)
    .map(res => res.json().data)
    //we go through multiple users that is why we use users =>
    .map(users => users.map(this.toUser))
    // to catch errors
    .catch(this.handleError);
      // return Observable.throw(err.json().data || 'Server error.');
    // to find specific user
    // .find((user, key) => user.first_name === 'george');

  }

 
  //get a SINGLE user
  getUser(id: number): Observable<User> {
     //attach Token
  let headers = new Headers();
  let token = localStorage.getItem('auth_token');
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${token}`);


    return this.http.get(`${this.usersUrl}/${id}`, { headers })
    .map(res => res.json().data)
    //we only have to map a single user
    .map(this.toUser)
    .catch(this.handleError);

  }

  //UPDATE user
  updateUser(user: User): Observable<User> {
    return this.http.put(`${this.usersUrl}/${user.id}`, user)
    .map(res => res.json())
    .catch(this.handleError);
  }

  //CREATE user
  createUser(user: User): Observable<User>{
    return this.http.post(`${this.usersUrl}/`, user)
    .map(res => res.json())
    .do(user => this.userCreated(user))
    .catch(this.handleError);
  }

  //DELETE user
  deleteUser(id: number): Observable<any>{
    return this.http.delete(`${this.usersUrl}/${id}`)
    .do(res => this.userDeleted())
    .catch(this.handleError);
  }

  //COMMUNICATE TO PARENT
  //The user was created. Add this info to our stream
  userCreated(user: User){
    console.log('user has been created');
    this.userCreatedSource.next(user);
  }

  userDeleted(){
    console.log('user has been deleted');
    this.userDeletedSource.next();
  }

  //method for ERROR, handle any errors
  //we use PRIVATE, since we only want these services to use it
  private handleError(err){
    let errMessage: string;
    if (err instanceof Response){
      let body = err.json() || '';
      let error = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }

  //convert user info to out standard
  private toUser(user): User{
    return{
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        username: user.first_name,
        avatar: user.avatar
    }
  }
}
