import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Login } from "../models/login.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: number | null = null;
  userName!: string;

  private url = 'http://localhost:8080/'

  constructor(private http :HttpClient){}

  login(userMail : string, userPassword : string): Observable<Login>{
    const credentials = {userMail, userPassword}
    return this.http.get<Login>(`${this.url}auth/${credentials.userMail}/${credentials.userPassword}`);
  }

logout() : void {
this.userId = null
}

}
