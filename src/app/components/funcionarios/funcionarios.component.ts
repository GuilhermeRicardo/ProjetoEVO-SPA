import { HttpClient } from '@angular/common/http';
import { Funcionarios } from './../../models/Funcionarios';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartamentosService } from './../departamentos/departamentos.service';
import { FuncionariosService } from './funcionarios.service';
import { MatTable } from '@angular/material/table';
import { Component, Inject, Input, OnInit, ViewChild, NgModule } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { CreateFuncionarioComponent } from 'src/app/shared/createFuncionario/createFuncionario.component';
import { subscribeOn } from 'rxjs';


@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss'],
  providers: [FuncionariosService, DepartamentosService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class FuncionariosComponent implements OnInit {
  @Input() photoIcon!: string
  @ViewChild(MatTable)
  table!: MatTable<any>
  profileForm!: FormGroup
  displayedColumns: string [] = ['id','nome','rg'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Funcionarios | null;
  dataSource!: Funcionarios[];
  // map!:Funcionarios
  selectedFile!: File;
  classFuncionario!: any
  atrituboTeste!: string
  putApiUrl = 'https://localhost:7029/v1/funcionario/'


    constructor(
      private http: HttpClient,
      @Inject(MAT_DIALOG_DATA) 
      public dummy: number,
      public dialog: MatDialog,
      public funcionariosRef: MatDialogRef<FuncionariosComponent>,
      public funcionariosService: FuncionariosService,
      public FormBuilder:FormBuilder,
      
    ) { 

      this.funcionariosService.getDepartamento(dummy)
      .subscribe((result:Funcionarios[]) => {
        console.log(result);
        this.dataSource = result;
      });

    }

  ngOnInit(): void {
    this.profileForm = this.FormBuilder.group({
      id: [''],
      nome: [''],
      rg: [''],
      foto:[''],
      departamentoID: ['']
    });

    throw new Error('Method not implemented.');
  } 

  deleteFuncionario(id: number): void {
    this.funcionariosService.deleteFuncionario(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(x => x.id !==id);
    });
    
  }

    openCreateFuncionario(): void {
      const dialogRef = this.dialog.open(CreateFuncionarioComponent,{
        width:'auto',
        data: {
          id: 1,
          nome: '',
          rg: '',
          departamentoID: this.dummy,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.funcionariosService.createFuncionario(result).subscribe(() => {
          this.dataSource.push(result);
          this.table.renderRows();
        })

      })

    }

    updateFuncionario() {
      const idFuncionario = this.profileForm.controls['id'].value
      const nomeFuncionario = this.profileForm.controls['nome'].value
      const rgFuncionario = this.profileForm.controls['rg'].value
      const departamentoIdFuncionario = this.profileForm.controls['departamentoID'].value
      
      const form: Funcionarios = {
        id: idFuncionario,
        nome: nomeFuncionario,
        rg: rgFuncionario,
        foto: '',
        departamentoID: departamentoIdFuncionario
      }
        console.log(form);

        this.funcionariosService.editFuncionario(idFuncionario, form).subscribe();
        this.profileForm.reset();
        this.dataSource = this.dataSource.filter(x => x.id !== form?.id) 
        this.dataSource.push(form);
      }


    valueButton (profileId: number, profileDepartamento: number) {

      this.profileForm.patchValue({
        id: profileId,
        departamentoID:profileDepartamento,
      });

      console.log(this.profileForm.value);
      
    }

    resetFuncionarios() {
      this.profileForm.reset()
    }



    onFileSelected(event: any): void {
      this.selectedFile = <File>event.target.files[0];
  }

    onUpload() {
      this.http.put('https://localhost:7029/v1/funcionario/',this.selectedFile).subscribe(result =>{
        console.log(result)
      })
    }

    refresh () {
      this.funcionariosService.getDepartamento(this.dummy)
      .subscribe((result:Funcionarios[]) => {
        this.dataSource = result;
        this.table.renderRows();
      });
    }

}
