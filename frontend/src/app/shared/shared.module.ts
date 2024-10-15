import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    SelectComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
