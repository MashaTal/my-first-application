import { Injectable } from "@angular/core";
import { User, Posts, Comments } from "./users";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}
  getDataUsers() {
    return this.http.get("http://localhost:3000/userList");
  }
}
