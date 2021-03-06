import { PostsService } from './../posts.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from "../post.model";
import {  Subscription } from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit,OnDestroy{

  posts:Post[] = [];
  private postsSub:Subscription;

  constructor(public postsService:PostsService) {}

  ngOnInit(){
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts:Post[])=>{
        this.posts = posts;
    })
  }

  ngOnDestroy(): void{
    this.postsSub.unsubscribe();
  }


  onDelete(postId:String){
    this.postsService.deletePost(postId);
  }
  

}
