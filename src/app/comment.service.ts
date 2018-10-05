import { Injectable } from '@angular/core';
import { Comments } from "./users";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {  map, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor( private http: HttpClient ) { 
  }
  getComments(id: number) {
    return this.http.get("http://localhost:3000/comments").pipe(
      map((data: Comments[]) => {
        return data.filter(function(comment: Comments) {
          if (comment.postId === id) {
            return comment;
          }
        });
      })
    );
  }
  saveComments(comment:Comments): Observable<any> {
    return this.http.put(`http://localhost:3000/comments/${comment.id}`, comment, httpOptions ).pipe(
      tap( ()=> console.log('save comment'))
    )
  }
  deleteComment(comment:Comments): Observable<any> {
    return this.http.delete<Comments>(`http://localhost:3000/comments/${comment.id}`)
  }
}
