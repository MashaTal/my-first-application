import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Posts } from "./users";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(id: number) {
    return this.http.get("http://localhost:3000/posts").pipe(
      map((data: Posts[]) => {
        return data.filter(function(post: Posts) {
          if (post.userId === id) {
            return post;
          }
        });
      })
    );
  }
  updatePost(post:Posts): Observable<any> {
    return this.http.put(`http://localhost:3000/posts/${post.id}`, post, httpOptions).pipe(
      tap(()=> console.log('paботает'))
    )
  }

  addPost(post:Posts):Observable<Posts> {
    return this.http.post<Posts>(`http://localhost:3000/posts`,post, httpOptions).pipe(
      tap(()=> console.log('added post'))
    )
  }

  deletePost(post:Posts): Observable<Posts> {
    return this.http.delete<Posts>(`http://localhost:3000/posts/${post.id}`,httpOptions).pipe(
      tap(()=> console.log('delete post'))
    )
  }
}
