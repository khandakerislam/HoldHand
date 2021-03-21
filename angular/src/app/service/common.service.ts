import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loginRole:string;
  login:boolean;
  registerAs;
  allData;
  profileRole;
  superlogin: boolean;
  loginDetails;
  constructor() { }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticaterUser')
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem('authenticaterUser')
  }
 loginTo(username){
  sessionStorage.setItem('authenticaterUser', username);

}
}
