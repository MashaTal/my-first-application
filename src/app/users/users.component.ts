import { Component, OnInit } from '@angular/core';
import { User, Posts } from '../users';
import { UserService } from '../user.service';
import { Observable} from 'rxjs';
import { filter } from 'rxjs/operators';
import { PostService } from '../post.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  posts:Posts[];
  users:User[];
  selectedUser:User;
  constructor(private userService: UserService, private postService: PostService) { }

  ngOnInit() {
    this.userService.getDataUsers().subscribe((data: User[]) => this.users = data);
  }
  onSelect(user: User): void {
    this.selectedUser = user;
    console.log(this.postService.getPosts(this.selectedUser.id)
    .subscribe(posts => this.posts= posts))
  }


 
}
