import { NgModule } from '@angular/core';
import { CartTableComponent } from '@/components/cart-table';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterModule } from '@angular/router';

@NgModule({
    
  imports: [ CommonModule, MaterialModule, FormsModule, OverlayModule, RouterModule, ReactiveFormsModule],
  declarations: [ CartTableComponent ],
  exports: [ CartTableComponent , CommonModule, MaterialModule, FormsModule, CoreModule, OverlayModule, ReactiveFormsModule]
})
export class SharedModule { }
