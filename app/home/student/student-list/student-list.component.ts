import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StudentRepositryService } from '../../shared/service/student-repositry.service';
import { Student } from '../../shared/student';
import { DeleteStudentDialogComponent } from './delete-student-dialog/delete-student-dialog.component';

@Component({
  selector: 'so-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  domesticColor = '#f1c0c0'; // '#d9c1f2';
  internationalColor = 'beige';
  nameFilter = '';
  studentTypeSelected = 'All';
  students: Student[] = [];

  constructor(
    private studentRepositry: StudentRepositryService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.getStudents();
  }

  /**
   * Opens a new dialog for student delete confiramtion.
   * 
   * @param student Student to delete.
   */
  openDialog(student: Student): void {
    const dialogRef = this.dialog.open(DeleteStudentDialogComponent, {
      width: '300px',
      height: '200px',
      data: student
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result !== undefined) {
        this.deleteStudent(result);
        }
      }
    );
  }

  /**
   * Updates list of students after deletion.
   * 
   */
  getStudents() {
    this.studentRepositry.getStudents()
    .subscribe(
        students => {
          this.students = students;
        });
  }

  /**
   * Gets a student based on the id.
   * 
   * @param id id of the stduent.
   */
  getStudent(id: number) {
    this.studentRepositry.getStudent(id).subscribe();
  }

  /**
   * Deletes the stduent based on the id.
   * 
   * @param id id of the student to be deleted.
   */
  deleteStudent(id: number) {
    this.studentRepositry.deleteStudent(id).subscribe();
    this.getStudents();
  }
}
