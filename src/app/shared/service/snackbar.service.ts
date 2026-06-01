import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _service:MatSnackBar) { }

  openSnackbar(msg:string){
     this._service.open(msg,'close',{
      horizontalPosition:'left',
      verticalPosition:'top',
      duration:2500
     })
  }
}
