import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Relation } from "../models/relation.model";
import { Observable } from "rxjs";
import { UserRelation } from "../models/add.relation.model";

@Injectable({
  providedIn: 'root'
})

export class RelationService {


  private url = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  getAllRelationById(userId: number): Observable<Relation[]> {
    const credentials = { userId }
    return this.http.get<Relation[]>(`${this.url}relation/relations/${credentials.userId}`);
  }


  createRelation(userRelation: UserRelation) {
    return this.http.post<UserRelation>(`${this.url}relation`, userRelation)
  }


}
