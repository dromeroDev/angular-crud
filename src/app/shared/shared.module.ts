import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogFormComponent } from './components/dialogForm/dialogForm.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [DialogFormComponent, SpinnerComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule],
  exports: [MaterialModule, DialogFormComponent, SpinnerComponent],
})
export class SharedModule {}
