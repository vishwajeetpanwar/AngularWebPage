import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StudentCategoryType } from '../enums/student-category-type.enum';
import { DocumentTypeRepositryService } from './document-type-repositry.service';
import { DocumentType } from 'src/app/home/shared/enums/document-type.enum';
import { Student } from '../student';
import { regExps } from './custom-validator.service';

@Injectable({
  providedIn: 'root'
})
export class StudentFormService {

  documents: {name: DocumentType, isMandatory: boolean}[];

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentTypeRepositryService
    ) {
      this.documents = this.documentService.getDocuments()[StudentCategoryType.DOMESTIC];
  }

  /**
   * Returns new student form group if param is null else editable student form group.
   *
   * @param student
   */
  getOnboardForm(student: Student): FormGroup {
    let form: FormGroup;

    if (student === null) {
      form = this.formBuilder.group({
        name: [null, [Validators.required, Validators.maxLength(20),
          Validators.pattern(regExps.personName)]],
        studentCategoryType: [StudentCategoryType.DOMESTIC, Validators.required],
        documentsCollection: this.addCheckboxes(null),
        dob: [null, [Validators.required, Validators.min(10102019)]],
        fatherName: [null, [Validators.required, Validators.maxLength(20),
          Validators.pattern(regExps.personName)]],
        motherName: [null, [Validators.required, Validators.maxLength(20),
          Validators.pattern(regExps.personName)]],
        lastClassScore: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
      });
    } else {
      form = this.formBuilder.group({
        name: [student.name,
          [Validators.required, Validators.maxLength(20), Validators.pattern(regExps.personName)]],
        studentCategoryType: [student.studentCategoryType, Validators.required],
        documentsCollection: this.addCheckboxes(student.documents),
        dob: [student.dob, Validators.required],
        fatherName: [student.fatherName,
          [Validators.required, Validators.maxLength(20), Validators.pattern(regExps.personName)]],
        motherName: [student.motherName,
          [Validators.required, Validators.maxLength(20), Validators.pattern(regExps.personName)]],
        lastClassScore: [student.lastClassScore, [Validators.required, Validators.min(0), Validators.max(100)]]
      });
    }

    return form;
}

  /**
   * Add checkboxes control for the student onboarding form.
   *
   * @param data
   */
  addCheckboxes(data): any {
    const checkboxes = this.documents.map( (element, index) => {
      const isDocPresent = data === null ? false : data[index++].isPresent;
      return this.formBuilder.control(isDocPresent);
    });
    return this.formBuilder.array(checkboxes);
  }

}
