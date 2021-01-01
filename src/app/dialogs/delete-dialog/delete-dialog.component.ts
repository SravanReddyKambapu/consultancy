import { DashboardService } from './../../services/dashboard.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DashboardService) { }

onNoClick(): void {
this.dialogRef.close();
}

confirmDelete(): void {
  this.dataService.dateItem(this.data.id).subscribe((item) => {
    this.dataService.deleteIssue(this.data.id);
  });
}

}
