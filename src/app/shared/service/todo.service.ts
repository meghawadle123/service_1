import { Injectable, OnInit } from "@angular/core";
import { Itodo, ITodoRes } from "../models/todo";
import { Observable, of, Subject } from "rxjs";


@Injectable({
    providedIn:'root'
})

export class TodoServiceComponent implements OnInit{

    editTodoSub$:Subject<Itodo>=new Subject();
    TodoArr:Array<Itodo>=[
    {
        todoItem:"js",
        todoId:"123"
    },
    {
        todoItem:"Angular",
        todoId:"124"
    },
    {
        todoItem:"Ts",
        todoId:"125"
    }
];
    constructor(){

    }
    ngOnInit(): void {
       
    }

   fetchAllTodo():Observable<Itodo[]>{
      return of(this.TodoArr)
   } 
  
   createTodo(todo:Itodo):Observable<ITodoRes>{
      this.TodoArr.push(todo)
      let res={
       msg:'New TodoItem is Added Successfully',
       data:todo
      }
      return of(res)
   }


   onRemove(id:string):Observable<ITodoRes>{
    let getindex=this.TodoArr.findIndex(t=>t.todoId===id);
    let removeItem=this.TodoArr.splice(getindex,1);
    let res={
        msg:'todoItem is removed Succesfully !!!',
        data:removeItem[0]
    }
    return of(res)
   }


   onUpdate(todo:Itodo):Observable<ITodoRes>{
    let getIndex=this.TodoArr.findIndex(t=>t.todoId===todo.todoId);
    this.TodoArr[getIndex]=todo;
    let res={
        msg:'The Item is Updated Succesfully',
        data:todo
    }
    return of(res)
   }
}