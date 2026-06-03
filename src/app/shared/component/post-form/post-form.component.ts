import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../service/post.service';
import { NgForm } from '@angular/forms';
import { Ipost } from '../../models/post';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
@ViewChild('postForm')postForm!:NgForm;
isInEditMode:boolean=false;

editObj!:Ipost
  constructor(private _postservice:PostService,
    private _snacknar:SnackbarService
  ) { }

  ngOnInit(): void {
    this.onedit();
  }

  onPostAdd(){
   if(this.postForm.valid){
     let newObj:Ipost={
       ...this.postForm.value,
       id:Date.now().toString()
     }
     this.postForm.reset();
     this._postservice.createpost(newObj).subscribe({
      next:data=>{
        this._snacknar.openSnackbar(data.msg);
      }
     })
   }
  }

  onedit(){
    this._postservice.EditObjSub$.subscribe({
      next:data=>{
        this.isInEditMode=true;
        this.editObj=data;
        this.postForm.form.patchValue(this.editObj);
      }
    })
  }

  onUpdate(){
    if(this.postForm.valid){
      let updated_obj:Ipost={
        ...this.postForm.value,
        id:this.editObj.id
      }
      this.isInEditMode=false;
      this.postForm.reset();
      this._postservice.onupdate(updated_obj).subscribe({
        next:data=>{
          this._snacknar.openSnackbar(data.msg)
        }
      })
    }
  }
}
