import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transactions } from "../models/transaction.model";

@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  private url = 'http://localhost:8080/'

  constructor(private http :HttpClient){}

  getAllTransactionById(userId : number) : Observable<Transactions []>{
    const credentials = {userId}
  return this.http.get<Transactions []>(`${this.url}transaction/${credentials.userId}`)
  }

}
