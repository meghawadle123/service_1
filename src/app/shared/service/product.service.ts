import { Injectable } from '@angular/core';
import { Iproduct, IresProduct } from '../models/product';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
productsArr:Array<Iproduct>= [
  {
    productId: "P101",
    productName: "Samsung Galaxy S24",
    brand: "Samsung",
    price: 74999,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },
  {
    productId: "P102",
    productName: "iPhone 15",
    brand: "Apple",
    price: 79999,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab"
  },
  {
    productId: "P103",
    productName: "OnePlus 12",
    brand: "OnePlus",
    price: 64999,
    imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505"
  },
  {
    productId: "P104",
    productName: "Dell Inspiron 15",
    brand: "Dell",
    price: 55999,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
  },
  {
    productId: "P105",
    productName: "Sony WH-1000XM5",
    brand: "Sony",
    price: 29999,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  }
];

editSubObj$:Subject<Iproduct>=new Subject();
  constructor() { }

  fetchAllproduct():Observable<Iproduct[]>{
   return of(this.productsArr)
}

createProduct(product:Iproduct):Observable<IresProduct>{
  this.productsArr.push(product);
  let res={
    msg:'the product is Added Succesfully',
    data:product
  }
  return of(res)
}

onremove(id:string):Observable<IresProduct>{
  let getindex=this.productsArr.findIndex(t=>t.productId===id);
 let removedItem= this.productsArr.splice(getindex,1);
  let res={
    msg:'The product is removed succesfully',
    data:removedItem[0]
  }
  return of(res)
}

onupdate(product:Iproduct):Observable<IresProduct>{
  let getindex=this.productsArr.findIndex(t=>t.productId===product.productId);
  this.productsArr[getindex]=product;
  let res={
    msg:'the product is Updated successfully',
    data:product
  }
  return of(res)
}
}
