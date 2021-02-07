import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogFormComponent } from '@shared/components/dialogForm/dialogForm.component';
import { CrudService } from '@core/services/crud.service';
import { Model } from '@core/models/model';
import { MatTableDataSource } from '@angular/material/table';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private crudService: CrudService) {
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

  ngOnInit() {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceFiltered.filter = filterValue;
  }

  getAll() {
    this.crudService.getAll().subscribe((res) => {
      this.dataSource = [];
      res.forEach((data) => {
        this.dataSource.push(data.payload.doc.data());
      });
      this.resultsLength = this.dataSource.length;
      this.initFilter();
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

  openDialog(action: string): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '50%',
      data: {
        action: action,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  delete(data) {
    console.log(data);
  }

  see(data) {
    console.log(data);
  }

  edit(data) {
    console.log(data);
  }
}
