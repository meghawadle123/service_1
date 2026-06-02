import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Iproduct } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
isInEditMode:boolean=false;

EditObj!:Iproduct
@ViewChild('productForm')productForm!:NgForm
  constructor(private _productService:ProductService,
    private _matsnackbar:SnackbarService
  ) { }

  ngOnInit(): void {
    this.onedit();
  }

  onAddproduct(){
    if(this.productForm.valid){
    let newObj:Iproduct={
      ...this.productForm.value,
      productId:Date.now().toString()
    }
    this.productForm.reset();
    this._productService.createProduct(newObj).subscribe({
      next:data=>{
        this._matsnackbar.openSnackbar(data.msg)
      },
      error:err=>{
        this._matsnackbar.openSnackbar(err.msg)
      }
    })
  }
  }

  onedit(){
     this._productService.editSubObj$.subscribe({
      next:data=>{
        this.EditObj=data;
        this.isInEditMode=true;
        this.productForm.form.patchValue(this.EditObj)
      }
     })
  }

  onUpdate(){
    if(this.productForm.valid){
    let updated_onj:Iproduct={
      ...this.productForm.value,
      productId:this.EditObj.productId
    }
    this.isInEditMode=false;
    this.productForm.reset();
    this._productService.onupdate(updated_onj).subscribe({
      next:data=>{
        this._matsnackbar.openSnackbar(data.msg);
      },
      error:err=>{
        this._matsnackbar.openSnackbar(err.msg);
      }
    })
  }
  }
}
