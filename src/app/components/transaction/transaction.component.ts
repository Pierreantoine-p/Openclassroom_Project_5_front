import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Relation } from 'src/app/models/relation.model';
import { Transactions } from 'src/app/models/transaction.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RelationService } from 'src/app/services/relation.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

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
    relations! : Relation[]

    constructor(private authService : AuthService,
       private transactionService: TransactionService,
        private userService : UserService,
        private relationService : RelationService) {
    }

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
  /*
      ngOnInit(): void {
    this.onHistoriqueTransaction();
    this.onListRelation();
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
      this.userId = this.authService.userId
      if(this.userId !== null){
        this.relationService.getAllRelationById(this.userId).subscribe({
          next : (relations : Relation[]) => {
            console.log("relations" + relations)
          this.relations = relations;
          const userRequests =  this.relations.map((relation) =>
         this.userService.getUSerById(relation.userRelationId)
          );
          forkJoin(userRequests).subscribe({
            next: (users: User[]) => {
              console.log("users : " , users)

            users.forEach((user, index) => {
              this.relationNamesMap[this.relations[index].userRelationId] = user.userName;
            })
          },
          error: Error => {
            console.log(`error : ${Error}`)
          },
        });
          } ,
              error: Error => {
                console.log(`error getAllRelationById : ${Error}`)
              },
        })
    }
    }
    */
