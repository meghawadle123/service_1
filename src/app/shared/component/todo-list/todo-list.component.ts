import { Component, OnInit } from '@angular/core';
import { Itodo } from '../../models/todo';
import { TodoServiceComponent } from '../../service/todo.service';
import { SnackbarService } from '../../service/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';
import { config } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoArr:Array<Itodo>=[]
  constructor(private _todoService:TodoServiceComponent,
    private _snackbar:SnackbarService,
    private _dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchAllTodo();
  }

fetchAllTodo(){
  this._todoService.fetchAllTodo().subscribe({
    next:data=>{
      this.todoArr=data
    },
    error:err=>{
       this._snackbar.openSnackbar('error')
    }
  })
}

trackbyFun(index:number,todo:Itodo){
  return todo.todoId;
}

Onremove(id:string){
  let config=new MatDialogConfig();
  config.width='450px';
  config.disableClose=true;
  config.data='Are you want to remove it !!!'
let confirm=this._dialog.open(GetconfirmComponent,config);
confirm.afterClosed().subscribe({
  next:data=>{
    if(data){
      this._todoService.onRemove(data).subscribe({
        next:data=>{
          this._snackbar.openSnackbar(data.msg)
        },
        error:err=>{
          this._snackbar.openSnackbar(err.msg)
        }
      })
    }
  }
})
}


onEdit(todo:Itodo){
  this._todoService.editTodoSub$.next(todo);
}
}
