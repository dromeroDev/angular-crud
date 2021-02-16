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
import { SpinnerService } from '@core/spinner/spinner.service';

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
  id: string;
  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  response: Model | undefined;
  action: string;
  readonly: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogFormComponent>,
    private crudService: CrudService,
    private spinnerService: SpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: Object
  ) {
    this.readonly = this.data['action'] === 'visibility';
    this.id = this.getDataValue('id');
    this.form = this.formBuilder.group({
      codigoFormControl: [
        { value: this.getDataValue('codigo'), disabled: this.readonly },
        [Validators.required, Validators.maxLength(12)],
      ],
      nombreFormControl: [
        { value: this.getDataValue('nombre'), disabled: this.readonly },
        [Validators.required, Validators.maxLength(200)],
      ],
      direccionFormControl: [
        { value: this.getDataValue('direccion'), disabled: this.readonly },
        [Validators.required, Validators.maxLength(200)],
      ],
      poblacionFormControl: [
        { value: this.getDataValue('poblacion'), disabled: this.readonly },
        [Validators.required, Validators.maxLength(100)],
      ],
      codigoPostalFormControl: [
        { value: this.getDataValue('codigoPostal'), disabled: this.readonly },
        [Validators.required, Validators.maxLength(50)],
      ],
      ciudadFormControl: [
        { value: this.getDataValue('ciudad'), disabled: this.readonly },
        [Validators.required, Validators.maxLength(100)],
      ],
      telefonoFormControl: [
        { value: this.getDataValue('telefono'), disabled: this.readonly },
        [Validators.required, Validators.maxLength(20)],
      ],
      emailFormControl: [
        { value: this.getDataValue('email'), disabled: this.readonly },
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
    });
  }

  getDataValue(property: string) {
    return this.data['person'] ? this.data['person'][property] : '';
  }

  onNoClick(): void {
    this.spinnerService.hide();
    this.dialogRef.close();
  }

  save(method) {
    this.spinnerService.show();
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

    this.crudService[method](this.id, body).then(
      (res) => {
        this.onNoClick();
      },
      (err) => {
        console.log(Error, err);
      }
    );
  }
}
