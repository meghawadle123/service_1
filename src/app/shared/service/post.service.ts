import { Injectable } from '@angular/core';
import { Ipost, IresPost } from '../models/post';
import { Observable, of, Subject } from 'rxjs';
import { IresProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class PostService {

   postsArr :Array<Ipost>= [
  {
    id: 'P101',
    title: 'Angular Basics',
    body: 'Introduction to Angular framework and its features.',
    userId: '1'
  },
  {
    id: 'P102',
    title: 'Components in Angular',
    body: 'Components are the building blocks of Angular applications.',
    userId: '1'
  },
  {
    id: 'P103',
    title: 'Data Binding',
    body: 'Angular supports interpolation, property binding, and event binding.',
    userId: '2'
  },
  {
    id: 'P104',
    title: 'Directives',
    body: 'Directives help manipulate the DOM and behavior of elements.',
    userId: '2'
  },
  {
    id: 'P105',
    title: 'Services and Dependency Injection',
    body: 'Services are used to share data and logic across components.',
    userId: '2'
  }
];

EditObjSub$:Subject<Ipost>=new Subject();
  constructor() { }

  FetchAllpost():Observable<Ipost[]>{
    return of(this.postsArr)
  }

  createpost(post:Ipost):Observable<IresPost>{
    this.postsArr.push(post);
    let res={
      msg:'The post is Added Succesfully',
      data:post
    }
    return of(res)
  }

  remove(id:string):Observable<IresPost>{
    let getindex=this.postsArr.findIndex(t=>t.id===id);
   let removeItem= this.postsArr.splice(getindex,1);
    let res={
      msg:'the post is removed succesfully',
      data:removeItem[0]
    }
    return of(res);
  }
  onupdate(post:Ipost):Observable<IresPost>{
    let getindex=this.postsArr.findIndex(t=>t.id===post.id);
    this.postsArr[getindex]=post;
    let res={
      msg:'the post is updated succesfully',
      data:post
    }
    return of(res)
  }
}
