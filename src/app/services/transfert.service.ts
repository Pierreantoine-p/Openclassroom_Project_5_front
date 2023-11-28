import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Transfert } from "../models/transfert.model"
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})

export class TransfertService {

  private url = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  createTransfert(transfert: Transfert): Observable<Transfert> {
    return this.http.post<Transfert>(`${this.url}transfert`, transfert)
  }

}
