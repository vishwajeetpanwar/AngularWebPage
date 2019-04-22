import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Student } from '../student';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StudentRepositryService {

  studentsUrl = 'api/students';
  studentDataKey = 'students';
  students: Student[] = [];

  constructor(private http: HttpClient) {
  }

  /**
   * Returns a student based on the id from the server.
   *
   * @param id id of the student to be returned.
   */
  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.studentsUrl}/${id}`);
  }

  /**
   * Returns all the students from the server.
   */
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl).pipe(
        tap(data => console.log(JSON.stringify(data)))
      );
  }

  /**
   * Add the given student to the server.
   * @param student student to be saved.
   */
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, httpOptions);
  }

  /**
   * Updates a given student and save the result to server.
   * @param student student for update.
   */
  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(this.studentsUrl, student, httpOptions);
  }

  /**
   * Removes a student from the server.
   * @param id id of the student to be removed.
   */
  deleteStudent(id: number): Observable<{}> {
    return this.http.delete(`${this.studentsUrl}/${id}`, httpOptions);
  }
}
