import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public autheservice:AuthenticationService,private route:Router) { }

  ngOnInit(): void {
  }
  handleLogaout(){
    this.autheservice.logOut().subscribe({
      next:(data)=>{
        this.route.navigateByUrl("/login");
      }
    })
  }

}
