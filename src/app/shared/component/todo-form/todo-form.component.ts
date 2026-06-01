import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Itodo } from '../../models/todo';
import { TodoServiceComponent } from '../../service/todo.service';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  @ViewChild('todoForm')todoForm!:NgForm;
  EditTodo!:Itodo
  isInEditMode:boolean=false
  constructor(private _service:TodoServiceComponent,
    private _snackbar:SnackbarService
  ) { }

  ngOnInit(): void {
  this.onEdit()
  }

  onAddTodo(){
   if(this.todoForm.valid){
    let newTodo:Itodo={
      ...this.todoForm.value,todoId:Date.now().toString()
    }
    this._service.createTodo(newTodo).subscribe({
     next:data=>{
       this._snackbar.openSnackbar(data.msg);
     },
     error:err=>{
       this._snackbar.openSnackbar(err.msg);
     }
    })
   }
  }


  onEdit(){
    this._service.editTodoSub$.subscribe({
      next:data=>{
        this.EditTodo=data;
        this.isInEditMode=true;
        this.todoForm.form.patchValue(data)
      },
      error:err=>{
        console.log(err)
      }
    })
  }


  Onupdate(){
    if(this.todoForm.valid){
    let UpdatedObj:Itodo={
      ...this.todoForm.value,
      todoId:this.EditTodo.todoId
    }
    this.isInEditMode=false;
    this.todoForm.reset();
    this._service.onUpdate(UpdatedObj).subscribe({
     next:data=>{
      this._snackbar.openSnackbar(data.msg)
     },
     error:err=>{
      this._snackbar.openSnackbar(err.msg)
     }
    })
  }
}
}
