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
  login! : Login
  login$! : Observable<Login>

  constructor(private authService : AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.login = new Login();
  }

  onLoginForm(form : NgForm){
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
/*
    ngOnInit(): void {
      this.userId = this.authService.userId;

      if (this.userId !== null) {
        const transactionRequest = this.transactionService.getAllTransactionById(this.userId);
        const relationRequest = this.relationService.getAllRelationById(this.userId);

        forkJoin({
          transactions: transactionRequest,
          relations: relationRequest
        }).subscribe({
          next: ({ transactions, relations }) => {
            this.transactions = transactions;
            this.relations = relations;

            const userTransactionRequests = this.transactions.map((transaction) =>
              this.userService.getUSerById(transaction.userIdTransaction)
            );

            const userRelationRequests = this.relations.map((relation) =>
              this.userService.getUSerById(relation.userRelationId)
            );

            forkJoin([...userTransactionRequests, ...userRelationRequests]).subscribe({
              next: (users: User[]) => {
                const transactionUsers = users.slice(0, this.transactions.length);
                const relationUsers = users.slice(this.transactions.length);

                transactionUsers.forEach((user, index) => {
                  this.userNamesMap[this.transactions[index].userIdTransaction] = user.userName;
                });

                relationUsers.forEach((user, index) => {
                  this.relationNamesMap[this.relations[index].userRelationId] = user.userName;
                });
              },
              error: (error) => {
                console.error("Erreur lors de la récupération des utilisateurs:", error);
              },
            });
          },
          error: (error: any) => {
            console.error(`Erreur lors de la récupération des transactions et relations : ${error}`);
          },
        });
      }
    }
  }
*/
