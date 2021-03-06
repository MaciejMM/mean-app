import { Component,OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from '../post.model';
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"]
})
export class PostCreateComponent implements OnInit{
  enteredContent="";
  enteredTitle="";
  private mode = "create";
  private postId:string;
  public post:Post;



  constructor(public postsService:PostsService,public route:ActivatedRoute) { }
  
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      // console.log(paramMap);
      if(paramMap.has("postId")){
        // console.log('has post ID');
        this.mode = "edit"
        this.postId = paramMap.get('postId')
        this.post = this.postsService.getPost(this.postId)
        
        
      }else{
        this.mode = "create"
        this.postId = null
      }



    })
  }

  onAddPost(form: NgForm) {

    if(form.invalid){
      return;
    }

    this.postsService.addPosts(form.value.title,form.value.content);
    form.resetForm();
  }

}
