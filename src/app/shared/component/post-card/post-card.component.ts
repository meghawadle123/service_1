import { Component, OnInit } from '@angular/core';
import { Ipost } from '../../models/post';
import { PostService } from '../../service/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
postArr:Array<Ipost>=[];
  constructor(private _postservice:PostService,
    private _matdialog:MatDialog,
    private _snackbar:SnackbarService
  ) { }

  ngOnInit(): void {
   this.fetchAllpost();
  }
trackByfun(index:number,post:Ipost){
  return post.id;
}

fetchAllpost(){
    this._postservice.FetchAllpost().subscribe({
      next:data=>{
        this.postArr=data;
      }
    })
  }

  onRemove(id:string){
    let config=new MatDialogConfig();
    config.width='350px';
    config.disableClose=true;
    config.data='are you sure? you want to rremove it'
    let confirm= this._matdialog.open(GetconfirmComponent,config);
    confirm.afterClosed().subscribe({
      next:data=>{
        if(data){
          this._postservice.remove(data).subscribe({
            next:data=>{
              this._snackbar.openSnackbar(data.msg);
            },
            error:err=>{
              this._snackbar.openSnackbar(err.msg);
            }
          })
        }
      }
    })
  }

  onEdit(post:Ipost){
    this._postservice.EditObjSub$.next(post);
  }
}
