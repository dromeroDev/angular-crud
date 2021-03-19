import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogFormComponent } from '@shared/components/dialogForm/dialogForm.component';
import { CrudService } from '@core/services/crud.service';
import { Model } from '@core/models/model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { SpinnerService } from '@core/spinner/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[];
  dataSource: any[];
  dataSourceFiltered: MatTableDataSource<Model>;
  resultsLength = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private crudService: CrudService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.displayedColumns = [
      'codigo',
      'nombre',
      'direccion',
      'poblacion',
      'codigoPostal',
      'ciudad',
      'telefono',
      'email',
      'actions',
    ];
    this.getAll();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceFiltered.filter = filterValue;
  }

  getAll() {
    this.spinnerService.show();
    this.crudService.getAll().subscribe((res) => {
      this.dataSource = [];
      res.forEach((data) => {
        const element: Model = {
          id: data.payload.doc.id,
          codigo: data.payload.doc.get('codigo'),
          nombre: data.payload.doc.get('nombre'),
          direccion: data.payload.doc.get('direccion'),
          poblacion: data.payload.doc.get('poblacion'),
          codigoPostal: data.payload.doc.get('codigoPostal'),
          ciudad: data.payload.doc.get('ciudad'),
          telefono: data.payload.doc.get('telefono'),
          email: data.payload.doc.get('email'),
        };
        this.dataSource.push(element);
      });
      this.resultsLength = this.dataSource.length;
      this.initFilter();
      this.initSort();
      this.initPaginator();
      this.spinnerService.hide();
    });
  }

  initFilter() {
    this.dataSourceFiltered = new MatTableDataSource(this.dataSource);
    this.dataSourceFiltered.filterPredicate = (data: Model, filter: string) =>
      data.nombre.toLocaleLowerCase().indexOf(filter) != -1 ||
      data.direccion.toLocaleLowerCase().indexOf(filter) != -1 ||
      data.poblacion.toLocaleLowerCase().indexOf(filter) != -1 ||
      data.ciudad.toLocaleLowerCase().indexOf(filter) != -1 ||
      data.email.toLocaleLowerCase().indexOf(filter) != -1;
  }

  initSort() {
    this.dataSourceFiltered.sort = this.sort;
  }

  initPaginator() {
    this.dataSourceFiltered.paginator = this.paginator;
  }

  openDialog(action: string, data: any): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '50%',
      data: {
        action: action,
        person: data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  delete(data) {
    this.spinnerService.show();
    this.crudService.delete(data.id).then((res) => {
      this.spinnerService.hide();
      this.snackBar.openFromComponent(AlertComponent, {
        duration: 5000,
        data: {
          message: 'Se elimino con exito!',
        },
      });
    });
  }

  see(data) {
    this.openDialog('visibility', data);
  }

  edit(data) {
    this.openDialog('update', data);
  }
}
