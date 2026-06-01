import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { Istudent } from '../../models/student';
import { NgForm } from '@angular/forms';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
isIneditMode:boolean=false;

EditObj!:Istudent
@ViewChild('stdForm')stdForm!:NgForm
  constructor(private _Stdservice:StudentService,
    private _snackbar:SnackbarService
  ) { }

  ngOnInit(): void {
    this.Onedit();
  }

  OnAddStd(){
    if(this.stdForm.valid){
    let newStd:Istudent={
      ...this.stdForm.value,
      stdid:Date.now().toString()
    }
    this._Stdservice.createStudent(newStd).subscribe({
      next:data=>{
         this._snackbar.openSnackbar(data.msg)
      },
      error:err=>{
        this._snackbar.openSnackbar(err.msg)
      }
    })
  }
}


Onedit(){
  this._Stdservice.EditSubObj$.subscribe({
    next:data=>{
      this.EditObj=data;
      this.isIneditMode=true;
      this.stdForm.form.patchValue(data)
    }
  })
}


OnUpdate(){
  let Updated_obj:Istudent={
    ...this.stdForm.value,
    stdid:this.EditObj.stdid
  }
 this.stdForm.reset();
 this.isIneditMode=false;
  this._Stdservice.onUpdate(Updated_obj).subscribe({
    next:data=>{
      this._snackbar.openSnackbar(data.msg)
    },
    error:err=>{
      this._snackbar.openSnackbar(err.msg);
    }
  })
}
}
