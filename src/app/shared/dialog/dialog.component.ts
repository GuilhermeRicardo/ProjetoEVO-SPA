import { Departamentos } from 'src/app/models/Departamentos';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  element!: Departamentos;
  isChange!: Boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Departamentos,
    public dialogRef: MatDialogRef<DialogComponent>,
  ) {}

  ngOnInit() {
    if (this.data.id != null) {
      this.isChange = true
    } else {
      this.isChange = false
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
