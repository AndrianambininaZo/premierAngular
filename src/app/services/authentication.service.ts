import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users:AppUser[]=[];
  authentificateUser:AppUser |undefined;

  constructor() { 
    this.users.push({userId:UUID.UUID(),username:"user1",password:"1233",role:["USER"]});
    this.users.push({userId:UUID.UUID(),username:"user2",password:"1234",role:["USER"]});
    this.users.push({userId:UUID.UUID(),username:"admin",password:"1235",role:["USER","ADMIN"]});
  }
  public login(username:string,password:string):Observable<AppUser>{
    let appUser=this.users.find(u=>u.username==username);
    if(!appUser) return throwError(()=>new Error("Not found"));
    
    if (appUser.password!=password) {
      return throwError(()=>new Error("Bad mot depass"));      
    }
    return of(appUser);
  }
  public authentificate(appUser:AppUser):Observable<boolean>{
    this.authentificateUser=appUser;
    localStorage.setItem("authUser",JSON.stringify({username:appUser.username,role:appUser.role,jwt:"JWT-TOKEN"}));
    return of(true);
  }
  public hasRole(role:string):boolean{
    return this.authentificateUser!.role.includes(role);
  }
  public isauthentificad(){
    return this.authentificateUser!=undefined;
  }
  public logOut():Observable<boolean>{
    this.authentificateUser=undefined;
    localStorage.removeItem('authUser');
    return of(true);
  }
}
