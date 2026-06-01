import { Component, OnInit } from '@angular/core';
import { Istudent } from '../../models/student';
import { StudentService } from '../../service/student.service';
import { SnackbarService } from '../../service/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {
stdArr:Array<Istudent>=[];
  constructor(private _service:StudentService,
    private _snackbar:SnackbarService,
    private _dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchAllStd();
  }

  fetchAllStd(){
    this._service.fetAllStudent().subscribe({
      next:data=>{
         this.stdArr=data;
      }
    })
  }

  trackByfun(index:number,student:Istudent){
    return student.stdid;
  }


  onRemove(id:string){
    let config=new MatDialogConfig();
    config.width='450px';
    config.disableClose=true;
    config.data='Are You sure ?You want to remove it!!!'
   let confirm= this._dialog.open(GetconfirmComponent,config);
   confirm.afterClosed().subscribe({
    next:data=>{
      if(data){
        this._service.onRemove(data).subscribe({
          next:data=>{
            this._snackbar.openSnackbar(data.msg)
          },
          error:err=>{
            this._snackbar.openSnackbar(err.msg);
          }
        })
      }
    }
   })
  }


  OnEdit(student:Istudent){
    this._service.EditSubObj$.next(student);
  }

}
