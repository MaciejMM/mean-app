import { HttpClient } from '@angular/common/http';
import { Post } from "../posts/post.model";
import { Subject } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();
    private apiRoot = "http://localhost:3000";
    constructor(private http: HttpClient) { }


    getPosts() {
        this.http.get<{ message: string, posts: Post[]; }>(`${this.apiRoot}/api/posts`)
            .subscribe((postData) => {
                this.posts = postData.posts;
                return this.postsUpdated.next([...this.posts]);
            });
            
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPosts(title: string, content: string) {
        const post: Post = { id: null, title: title, content: content };
        this.http
        .post<{message:string}>(`${this.apiRoot}/api/posts`,post)
        .subscribe((responseData)=>{
            console.log(responseData.message);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        })

    }
}