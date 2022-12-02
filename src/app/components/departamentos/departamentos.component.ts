import { Departamentos } from 'src/app/models/Departamentos';
import { DialogComponent } from './../../shared/dialog/dialog.component';
import { MatTable } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartamentosService } from './departamentos.service';
import { MatDialog } from '@angular/material/dialog';
import { FuncionariosComponent } from '../funcionarios/funcionarios.component';



@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss'],
  providers: [DepartamentosService]
})

export class DepartamentosComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string [] = ['id','nome','sigla','actions'];
  dataSource!: Departamentos[];

    constructor(
      public funcionarios: MatDialog,
      public dialog: MatDialog,
      public departamentosService: DepartamentosService

    ) {
      this.departamentosService.getAll()
      .subscribe((data:Departamentos[]) => {
        console.log(data);
        this.dataSource = data;
      });
    }

    ngOnInit(): void {
      
    }

    openDialog(element: Departamentos | null): void {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: element === null ? {
          id: null,
          nome: '',
          sigla: '',
        } : {
          id: element.id,
          nome: element.nome,
          sigla: element.sigla
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          console.log(result);
          if (this.dataSource.map(x => x.id).includes(result.id)) {
            this.dataSource[result.id - 1] = result;
            this.table.renderRows();
          } else {
            this.departamentosService.createDepartamento(result)
            .subscribe(() => {
              this.dataSource.push(result);
              this.table.renderRows();
            });
          }
        }
      });
    }

    editDialog(element: Departamentos | null): void{
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: element === null ? {
          id: null,
          nome: '',
          sigla: '',
        } : {
          id: element.id,
          nome: element.nome,
          sigla: element.sigla
        }
      });

      dialogRef.afterClosed().subscribe(result => {
      this.departamentosService.editDepartamento(result.id, result).subscribe(() => {
        this.dataSource = this.dataSource.filter(x => x.id !== element?.id) 
        this.dataSource.push(result);
        this.table.renderRows();
      });
      this.table.renderRows();
      }
      );

    }

    deleteDialog(id: number): void {
      this.departamentosService.deleteDepartamento(id).subscribe(() => {
        this.dataSource = this.dataSource.filter(x => x.id !==id);
      });
    }

    openFuncionarios(element: Departamentos) {

  

      this.funcionarios.open(FuncionariosComponent, {
        width: 'auto',
        height: 'auto',
        data: element.id,

      });

      // this.funcionarios.open(FuncionariosComponent, {
      //   width: '80em'
      // }); this.sendId.emit(element.id);
      //   console.log(this.sendId);
      
    }

    refresh() {
      this.departamentosService.getAll()
      .subscribe((data:Departamentos[]) => {
        console.log(data);
        this.dataSource = data;
        this.table.renderRows();
      });
    }

  }
