import { Injectable } from '@angular/core';
import { Iresstudent, Istudent } from '../models/student';
import { Observable, of, Subject } from 'rxjs';
import { Ires, ITodoRes } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
studentsArr:Array<Istudent>= [
  {
    fname: "Megha",
    lname: "Wadle",
    email: "megha@gmail.com",
    contact: "9876543210",
    stdid: '101',
    isActive:true
  },
  {
    fname: "Rahul",
    lname: "Sharma",
    email: "rahul@gmail.com",
    contact: "9123456780",
    stdid: '102',
    isActive:false
  },
  {
    fname: "Priya",
    lname: "Patil",
    email: "priya@gmail.com",
    contact: "9988776655",
    stdid: '103',
    isActive:true
  }
];

EditSubObj$:Subject<Istudent>=new Subject();
  constructor() { }


  fetAllStudent():Observable<Array<Istudent>>{
    return of(this.studentsArr)
  }

  createStudent(student:Istudent):Observable<Iresstudent>{
  this.studentsArr.push(student);
  let res={
    msg:'the student is added succesfully',
    data:student
  }
  return of(res)
  }



  onRemove(id:string){
    let getindex=this.studentsArr.findIndex(t=>t.stdid===id);
   let removeItem= this.studentsArr.splice(getindex,1);
    let res={
      msg:'The student is removed succesfully',
      data:removeItem[0]
    }
    return of(res)
  }

onUpdate(student:Istudent){
  let getIndex=this.studentsArr.findIndex(t=>t.stdid===student.stdid);
  this.studentsArr[getIndex]=student;
  let res={
    msg:'the student is Updated Succesfully',
    data:student
  }
  return of(res)
}
}
