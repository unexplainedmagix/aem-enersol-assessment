import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export class User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers:  [ AuthService ]
})
export class SignInComponent implements OnInit {

  user: User = {
    username:"",
    password:""
  };

  constructor(private router: Router,private authService:AuthService) {
    if(this.authService.isAuthenticated){
      this.router.navigateByUrl('/dashboard');
    }
   }

  login(){
    this.authService.login(this.user)
    .subscribe(
      response=>{
        localStorage.setItem('token', response.toString());
        this.router.navigateByUrl('/dashboard');
      },
      error=>{
        console.log("Error :"+error.message)
      }
    );
  }

  ngOnInit() {
  }

}
