import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Relation } from "../models/relation.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RelationService {


  private url = 'http://localhost:8080/'

  constructor(private http :HttpClient){}

  getAllRelationById(userId : number): Observable<Relation[]>{
    const credentials = {userId}
    return this.http.get<Relation[]>(`${this.url}relation/relations/${credentials.userId}`);
  }


}
