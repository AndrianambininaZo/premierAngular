import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userFormGroup!:FormGroup;
  erroMsg!:string;

  constructor( private fb:FormBuilder,
              private autheservice:AuthenticationService,
              private router:Router)
               { }

  ngOnInit(): void {
    this.userFormGroup=this.fb.group({
      username:this.fb.control("",[Validators.required,Validators.minLength(4)]),
      password:this.fb.control("",[Validators.minLength(4)]),
    })
  }
  handleLogin() {
    let username=this.userFormGroup.value.username;
    let password=this.userFormGroup.value.password;
    this.autheservice.login(username,password).subscribe({
      next:(appUser)=>{
        this.autheservice.authentificate(appUser).subscribe({
          next:(data)=>{
            this.router.navigateByUrl("/admin")

          }

        })
      },
      error:(err)=>{
        this.erroMsg=err;

      }

    })

}
getErrorValidator(name:string, error:ValidationErrors){
  if(error['required']){//le avy @control.fb in ity eto ity
    
  return name+ "required";

  }
  else if(error['minLength']){
    return "Fohy loatrar";
  }else return "";
}

}
