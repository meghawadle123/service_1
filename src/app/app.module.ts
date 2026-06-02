import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoListComponent } from './shared/component/todo-list/todo-list.component';
import { TodoFormComponent } from './shared/component/todo-form/todo-form.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GetconfirmComponent } from './shared/component/getconfirm/getconfirm.component';
import { StudentTableComponent } from './shared/component/student-table/student-table.component';
import { StudentFormComponent } from './shared/component/student-form/student-form.component';
import { ProductFormComponent } from './shared/component/product-form/product-form.component';
import { ProductCardComponent } from './shared/component/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFormComponent,
    GetconfirmComponent,
    StudentTableComponent,
    StudentFormComponent,
    ProductFormComponent,
    ProductCardComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
     MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
