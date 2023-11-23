import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Relation } from 'src/app/models/relation.model';
import { Transactions } from 'src/app/models/transaction.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RelationService } from 'src/app/services/relation.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { UserRelation } from 'src/app/models/add.relation.model';

@Component({
  selector: 'app-transfert',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
  export class TransactionComponent implements OnInit {
    userId! : number | null
    userOwnerName!: string;
    userRelationName!: string;
    transactions! : Transactions[]
    userNamesMap: { [key: number]: string } = {};
    relationNamesMap: { [key: number]: string } = {};
    users!: User[];
    relations! : Relation[];
    modalOpened: boolean = false;
    userInput: string = '';
    submittedText: string = '';
    userMail! : string;
    userRelation!: UserRelation

    constructor(private authService : AuthService,
       private transactionService: TransactionService,
        private userService : UserService,
        private relationService : RelationService,
        public dialog: MatDialog) {}


      ngOnInit(): void {
    this.onHistoriqueTransaction();
    this.onListRelation();
    this.userRelation = new UserRelation;
    }

    onHistoriqueTransaction(){
      this.userId = this.authService.userId
        if(this.userId !== null){
          this.transactionService.getAllTransactionById(this.userId).subscribe({
            next :(transactions : Transactions[]) => {
              this.transactions = transactions;
              const userRequests =  this.transactions.map((transactions) =>
              this.userService.getUSerById(transactions.userIdTransaction)
              );
              forkJoin(userRequests).subscribe({
                next: (users: User[]) => {
                users.forEach((user, index) => {
                  this.userNamesMap[this.transactions[index].userIdTransaction] = user.userName;
                })
              },
              error: Error => {
                console.log(`error : ${Error}`)
              },
            });
          },
          error: (error: any) => {
            console.error(`Erreur lors de la récupération des transactions : ${error}`);
          },
        });
      }
    }

    onListRelation() {
      this.userId = this.authService.userId;
      if (this.userId !== null) {
        this.relationService.getAllRelationById(this.userId).subscribe({
          next: (relations: Relation[]) => {
            console.log("Relations récupérées :", relations);

            if (relations && relations.length > 0) {
              this.relations = relations;

              const userRequests = this.relations.map((relation) =>
                this.userService.getUSerById(relation.userFkIdRelation)
              );

              forkJoin(userRequests).subscribe({
                next: (users: User[]) => {
                  console.log("users : ", users);

                  users.forEach((user, index) => {
                    this.relationNamesMap[this.relations[index].userFkIdRelation] = user.userName;
                  });
                },
                error: Error => {
                  console.log(`error : ${Error}`);
                },
              });
            }
          },
          error: Error => {
            console.log(`error getAllRelationById : ${Error}`);
          },
        });
      }
    }

    onAddRelation(form : NgForm){

      this.userId = this.authService.userId;

      if (this.userId !== null) {
        console.log(form.value)
        if(form.valid){
          const {userMail} = form.value;
          this.userMail = userMail;
          this.userService.getUSerByMail(this.userMail).subscribe({
          next: (user : User) =>{
          this.userRelation.userFkIdOwnerRelation = this.userId
          this.userRelation.user.userId = user.userId
          this.relationService.createRelation(this.userRelation).subscribe({
            next: (userRelation: UserRelation) => {
              console.log("userRelation " + this.userRelation)
            },
            error: error => {
              console.log(`error : ${error}`)

                   },
          })
          },
          error: error => {
            console.log(`error : ${error}`)

       },
          })
        }
      }
  }

  onAddTransfert(form : NgForm){

    this.userId = this.authService.userId;

      if (this.userId !== null) {
  }

}
  }




      /*
mon id
mail de la personne
getUserByMail
recupére l'id
post relation userId+ id relation
*/
