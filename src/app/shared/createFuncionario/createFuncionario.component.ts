import { Funcionarios } from 'src/app/models/Funcionarios';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionariosComponent } from 'src/app/components/funcionarios/funcionarios.component';

@Component({
  selector: 'app-createFuncionario',
  templateUrl: './createFuncionario.component.html',
  styleUrls: ['./createFuncionario.component.css']
})
export class CreateFuncionarioComponent implements OnInit {  element!: Funcionarios;
  isChange!: Boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Funcionarios,
    public dialogRef: MatDialogRef<FuncionariosComponent>,
  ) {}

  ngOnInit() {

  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
