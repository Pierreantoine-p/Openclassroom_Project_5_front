import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private url = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  getUSerByMail(mail: string): Observable<User> {
    const credentials = { mail }

    return this.http.get<User>(`${this.url}user/mail/${credentials.mail}`);
  }

  getUSerById(userId: number | null): Observable<User> {

    const credentials = { userId }

    return this.http.get<User>(`${this.url}user/id/${credentials.userId}`);
  }


}
