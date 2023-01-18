import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
     CommonModule,
     MatPaginatorModule,
     MatTableModule
  ],
  exports:[CommonModule,FormsModule,ReactiveFormsModule,MatPaginatorModule,MatTableModule]
})
export class SharedModule { }
