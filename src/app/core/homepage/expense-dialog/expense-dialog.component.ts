import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-expense-dialog',
  imports: [
    MatDialogTitle,
    MatDialogTitle,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './expense-dialog.component.html',
  styleUrl: './expense-dialog.component.scss',
})
export class ExpenseDialogComponent {
  dialogRef = inject(MatDialogRef<ExpenseDialogComponent>);
  data: any = inject(MAT_DIALOG_DATA);
  categories: string[] = ['food', 'transport', 'health', 'others'];

  form = new FormGroup({
    description: new FormControl(null, [Validators.required]), // asyncValidators: [emailIsUnique],
    amount: new FormControl(null, [Validators.required]), // mustContainQuestionMark
    category: new FormControl(null, [Validators.required]),
  });

  ngOnInit() {
    console.log('data:', this.data);
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    let expense = this.form.value;
    console.log('expense:', expense);
    this.dialogRef.close(expense);
  }
}
