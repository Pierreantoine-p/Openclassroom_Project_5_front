import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login!: Login
  login$!: Observable<Login>

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.login = new Login();
  }

  onLoginForm(form: NgForm) {
    console.log(form.value)
    if (form.valid) {
      const { userMail, userPassword } = form.value;
      this.authService.login(userMail, userPassword).subscribe({
        next: (login: Login) => {
          this.authService.userId = login.userId
          this.router.navigate(['/profil']);
        },
        error: error => {
          console.log(`error : ${error}`)

        },
      })

    }
  }
}

