import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { StudentListComponent } from '../student-list.component';
import { Student } from 'src/app/home/shared/student';

@Component({
  selector: 'so-delete-student-dialog',
  templateUrl: './delete-student-dialog.component.html',
  styleUrls: ['./delete-student-dialog.component.css']
})
export class DeleteStudentDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StudentListComponent>,
    @Inject(MAT_DIALOG_DATA) public student: Student
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
