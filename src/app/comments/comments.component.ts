import { Component, OnInit, Input } from '@angular/core';
import{ Posts, Comments, User } from '../users';
import { CommentService } from '../comment.service';
import { tap } from "rxjs/operators";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
   @Input() posts:Posts[];
   @Input() comments:Comments[];
   @Input() user:User;
   selectedComment:Comments;
  constructor( private commentService:CommentService) { }

  ngOnInit() {
  }
  
  getInput(comment:Comments) {
    this.selectedComment=comment;
  }

  isSelected(commentId: number) {
    if (!commentId || !this.selectedComment) {
      return;
    }
    return this.selectedComment.id === commentId;
  }
  
  save(name:string, body:string): void {
    this.selectedComment.name=name;
    this.selectedComment.body=body;
      this.commentService.saveComments(this.selectedComment).subscribe(
        ()=> console.log('сохранилось')
      );
  }

  delete():void {
    this.comments=this.comments.filter((com)=> com !== this.selectedComment)
    this.commentService.deleteComment(this.selectedComment).subscribe(
      ()=> console.log('delete ...')
    )
  }

}
