export class User {
    "id":number;
    "name":string;
    "username":string;
}
export class Posts {
    "userId":number;
    "id":number;
    "title":string;
    "body": string;
}
export class Comments {
    "postId":number;
    "id":number;
    "name": string;
    "email": string;
    "body":string;
    "bool"?:boolean;
}