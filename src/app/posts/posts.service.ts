import {Post} from "../posts/post.model";
import { Subject } from "rxjs";
import { Injectable } from '@angular/core';


@Injectable({providedIn:"root"})
export class PostsService{
    private posts:Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    getPosts(){
        return [...this.posts];
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPosts(title:string,content:string){
        const post:Post = {title:title,content:content}
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
}