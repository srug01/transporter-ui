import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

 @Input()  username:String ;
   password:String ;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  login() : void {
    if(this.username == 'admin' && this.password == 'admin'){
      this.router.navigate(['default']);
      console.log(this.username);
    }else {
      alert("Invalid credentials");
    }
  }
  }

