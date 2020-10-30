import { HttpClient } from '@angular/common/http';
import { Post } from "../posts/post.model";
import { Subject } from "rxjs";
import { Injectable } from '@angular/core';
import {map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();
    private apiRoot = "http://localhost:3000";
    constructor(private http: HttpClient) { }


    getPosts() {
        this.http
            .get<{ message: string, posts: any; }>(
                `${this.apiRoot}/api/posts`)
            .pipe(map((postData)=>{
                console.log(postData.posts);
                
                return postData.posts.map(post=>{
                    return {
                        title:post.title,
                        content:post.content,
                        id:post._id
                    }
                })
            }))
            .subscribe((mappedPost) => {
                this.posts = mappedPost;
                return this.postsUpdated.next([...this.posts]);
            });

    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }


    getPost(id:string){
        return {...this.posts.find(p=>{
            if(p.id ==id) return p
            
        })};
        

        


    }

    addPosts(title: string, content: string) {
        const post: Post = { id: null, title: title, content: content };
        this.http
        .post<{message:string,postId:string}>(`${this.apiRoot}/api/posts`,post)
        .subscribe((responseData)=>{
            // const postId = responseData.postId;
            post.id = responseData.postId;
            console.log(responseData.message);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        })

    }


    deletePost(postId:String){
        this.http.delete(`${this.apiRoot}/api/posts/${postId}`)
        .subscribe((res:any)=>{
 
            const updatedPosts = this.posts.filter(post=>post.id !== postId)
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts])
        })
    }
}