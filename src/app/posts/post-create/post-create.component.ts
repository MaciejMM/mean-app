import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { interval,timer } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit{
  enteredContent: string;
  enteredTitle: string;
  enteredTitleTwo: string;

  constructor(public postsService:PostsService) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  onAddPost(form: NgForm) {

    if(form.invalid){
      return;
    }

    this.postsService.addPosts(form.value.title,form.value.content);
    form.resetForm();
  }

}
