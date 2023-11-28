import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Relation } from 'src/app/models/relation.model';
import { Transactions } from 'src/app/models/transaction.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RelationService } from 'src/app/services/relation.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { UserRelation } from 'src/app/models/add.relation.model';
import { Transfert } from 'src/app/models/transfert.model';
import { TransfertService } from 'src/app/services/transfert.service';

@Component({
  selector: 'app-transfert',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit  {
  mySelect?: ElementRef;
  userId!: number | null
  userOwnerName!: string;
  userRelationName!: string;
  transactions!: Transactions[]
  userNamesMap: { [key: number]: string } = {};
  relationNamesMap: { [key: number]: string } = {};
  users!: User[];
  relations!: Relation[];
  userMail!: string;
  userRelation!: UserRelation;
  transfert!: Transfert;
  amount!: number;
  userIdTransfert!: number

  @ViewChild('mySelect') set content(content: ElementRef) {
    if (content) {
      this.mySelect = content;
      const selectElement: HTMLSelectElement = this.mySelect.nativeElement;
      console.log(typeof selectElement);
    }
  }

  constructor(private authService: AuthService,
    private transactionService: TransactionService,
    private userService: UserService,
    private relationService: RelationService,
    private transfertService: TransfertService

  ) { }


  ngOnInit(): void {
    this.onHistoriqueTransaction();
    this.onListRelation();
    this.userRelation = new UserRelation;
    this.transfert= new Transfert()

  }

  onHistoriqueTransaction() {
    this.userId = this.authService.userId
    if (this.userId !== null) {
      this.transactionService.getAllTransactionById(this.userId).subscribe({
        next: (transactions: Transactions[]) => {
          this.transactions = transactions;
          const userRequests = this.transactions.map((transactions) =>
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
            console.log(this.relations)
          }
        },
        error: Error => {
          console.log(`error getAllRelationById : ${Error}`);
        },
      });
    }
  }

  onAddRelation(form: NgForm) {

    this.userId = this.authService.userId;

    if (this.userId !== null) {
      console.log(form.value)
      if (form.valid) {
        const { userMail } = form.value;
        this.userMail = userMail;
        this.userService.getUSerByMail(this.userMail).subscribe({
          next: (user: User) => {
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

  onAddTransfert() {
    this.userId = this.authService.userId;
    if (this.userId !== null) {

        this.userIdTransfert
        this.amount
       console.log("avant ")

       this.transfert.useridOwner= this.userId
       this.transfert.userfkIdRelation=this.userIdTransfert
        this.transfert.amount = this.amount
        this.transfert.description="description"
        console.log("apres ")

        console.log(this.transfert)

        this.transfertService.createTransfert(this.transfert).subscribe({
          next: (transfert: Transfert) => {
            console.log("transfert ")

          console.log(transfert)

          },
          error: error => {
            console.log(`error : ${error}`)

          },
        })
    }
  }
/*
  getTypeOfSelectElement() {
    const selectElement: HTMLSelectElement = this.mySelect.nativeElement;

    // Maintenant, vous pouvez vérifier le type de l'élément select
    console.log(typeof selectElement); // Cela affichera le type de l'élément select dans la console
  }

  ngAfterViewInit() {
    if (this.mySelect) {
      const selectElement: ElementRef = this.mySelect.nativeElement;
      if (selectElement instanceof HTMLSelectElement) {
        console.log('C\'est bien un élément <select>');
        console.log(JSON.stringify(selectElement, null, 2));
      } else {
        console.log('Ce n\'est pas un élément <select>');
      }
    }
  }
*/
}
