import { Component, OnInit, Input } from '@angular/core';
import {  PostService } from '../post.service';
import { Posts, Comments } from  "../users";
import {  CommentService } from '../comment.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  selectedPost:Posts;
  comments: Comments[];
  value:Posts= {
    "userId":0,
    "id":0,
    "title":"title...",
    "body": "text..."
  };
  post:Posts;


  @Input() posts;
  @Input() user;

  constructor(
    private postService: PostService,
    private commentService: CommentService
  ) { }

  ngOnInit():void {
  }
  onSelectPost(post:Posts) {
    this.selectedPost=post;
    this.value=post;
    this.commentService.getComments(post.id)
    .subscribe((comments)=> this.comments = comments)
  }
  save(): void {
     this.postService.updatePost(this.selectedPost).subscribe(
       ()=>{ console.log('save post')},
       error => console.log('error') 
     )
  }

  add(title:string, body :string, userId: number): void {
    if(!body || !title) {
      return;
    }
    this.postService.addPost( { title, body, userId } as Posts ).subscribe(
    (post:Posts)=>{ this.posts.push(post);}
    );
  }

  delete():void {
    this.posts= this.posts.filter( post=> post !== this.selectedPost);
    this.postService.deletePost(this.selectedPost).subscribe()
  }
}

