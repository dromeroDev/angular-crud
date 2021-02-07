import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogFormComponent } from './components/dialogForm/dialogForm.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [DialogFormComponent, SpinnerComponent, AlertComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule],
  exports: [
    MaterialModule,
    DialogFormComponent,
    SpinnerComponent,
    AlertComponent,
  ],
})
export class SharedModule {}
