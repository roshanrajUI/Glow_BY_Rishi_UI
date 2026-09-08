import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.scss',
})
export class ConfirmationDialog {
  readonly dialog = inject(MatDialogRef<ConfirmationDialog>);
  readonly data = inject<{
    heading: string;
    message: string;
  }>(MAT_DIALOG_DATA);

  onCancel() {
    this.dialog.close(false);
  }

  onConfirm() {
    this.dialog.close(true);
  }
}
