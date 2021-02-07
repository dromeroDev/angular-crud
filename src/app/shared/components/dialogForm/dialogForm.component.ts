import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CrudService } from '@core/services/crud.service';
import { Model } from '@core/models/model';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'dialog-new-message',
  templateUrl: './dialogForm.component.html',
  styleUrls: ['./dialogForm.component.scss'],
})
export class DialogFormComponent {
  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  response: Model | undefined;
  action: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogFormComponent>,
    private crudService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: Object
  ) {
    this.form = this.formBuilder.group({
      codigoFormControl: ['', [Validators.required]],
      nombreFormControl: ['', [Validators.required]],
      direccionFormControl: ['', [Validators.required]],
      poblacionFormControl: ['', [Validators.required]],
      codigoPostalFormControl: ['', [Validators.required]],
      ciudadFormControl: ['', [Validators.required]],
      telefonoFormControl: ['', [Validators.required]],
      emailFormControl: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(method) {
    const body = {
      codigo: this.form.get('codigoFormControl')?.value,
      nombre: this.form.get('nombreFormControl')?.value,
      direccion: this.form.get('direccionFormControl')?.value,
      poblacion: this.form.get('poblacionFormControl')?.value,
      codigoPostal: this.form.get('codigoPostalFormControl')?.value,
      ciudad: this.form.get('ciudadFormControl')?.value,
      telefono: this.form.get('telefonoFormControl')?.value,
      email: this.form.get('emailFormControl')?.value,
    };

    this.crudService[method](body).then(
      (res) => {
        console.log(res);
        this.onNoClick();
      },
      (err) => {
        console.log(Error, err);
      }
    );
  }
}
