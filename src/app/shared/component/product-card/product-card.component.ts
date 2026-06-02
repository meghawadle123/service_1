import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  productArr:Array<Iproduct>=[];
  constructor(private _productService:ProductService,
    private _matDilog:MatDialog,
    private _matsnackbar:SnackbarService
  ) { }

  ngOnInit(): void {
  this.fetchAllproduct();
  }

  fetchAllproduct(){
    this._productService.fetchAllproduct().subscribe({
      next:data=>{
        this.productArr=data;
      }
    })
  }

  onRemove(id:string){
    let config=new MatDialogConfig();
    config.width='450px';
    config.disableClose=true;
    config.data='Are You Sure? You Want to remove it!!!'
   let confirm= this._matDilog.open(GetconfirmComponent,config);
   confirm.afterClosed().subscribe({
    next:data=>{
      if(data){
        this._productService.onremove(data).subscribe({
          next:data=>{
            this._matsnackbar.openSnackbar(data.msg);
          },
          error:err=>{
            this._matsnackbar.openSnackbar(err.msg);
          }
        })
      }
    }
   })
  }

  OnEdit(product:Iproduct){
   this._productService.editSubObj$.next(product);
  }
}
