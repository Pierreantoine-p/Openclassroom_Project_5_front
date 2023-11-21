import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  user: User | undefined;
  userId!: number | null;

  userMail! : string ;

  constructor(private authService : AuthService,
    private userService : UserService) {}

  ngOnInit(): void {
  this.userId = this.authService.userId;
  console.log("hello +" + this.userId )


  this.userService.getUSerById(this.userId).subscribe(
    (userData : User) => {
    this.user = userData;
    console.log(" this.user + " +  this.user)
    },
    (error) => {
      console.error(error); // Gérez les erreurs de requête
    }
  )

}
}
