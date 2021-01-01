import { DashboardService } from './../../services/dashboard.service';
import { Items } from './../../models/items';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Items,
    public dataService: DashboardService) { }

formControl = new FormControl('', [
Validators.required
// Validators.email,
]);

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :
this.formControl.hasError('email') ? 'Not a valid email' :
'';
}

submit() {
// emppty stuff
this.dataService.saveItem(this.data).subscribe((item) => {
  this.dataService.addIssue(this.data);
});
}

onNoClick(): void {
this.dialogRef.close();
}

public confirmAdd(): void {
this.dataService.addIssue(this.data);
}

}
