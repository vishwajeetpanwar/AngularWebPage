import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { DocumentType } from '../../shared/enums/document-type.enum';
import { StudentCategoryType } from '../../shared/enums/student-category-type.enum';
import { DocumentTypeRepositryService } from '../../shared/service/document-type-repositry.service';
import { StudentRepositryService } from '../../shared/service/student-repositry.service';
import { Student } from '../../shared/student';
import { StudentFormService } from '../../shared/service/student-form.service';
import { OnboardingErrorStateMatcher, errorMessages, CustomValidatorService } from '../../shared/service/custom-validator.service';

export enum FormRequest {
  ADD = 'add',
  EDIT = 'edit',
  VIEW = 'view'
}

@Component({
  selector: 'so-student-onboarding',
  templateUrl: './student-onboarding.component.html',
  styleUrls: ['./student-onboarding.component.css']
})
export class StudentOnboardingComponent implements OnInit {

  formTitle = 'Student Onboarding Form';
  documents: {name: DocumentType, isMandatory: boolean}[];
  onboardingForm: FormGroup;
  studentId: string;
  student: Student = null;
  formTypeRequest: string;
  mandatoryDocumentsPresent: boolean;
  dobStartDate = new Date(1990, 1);
  dobMinDate = new Date(1990, 1, 1);
  dobMaxDate = new Date(2016, 11, 30);
  matcher: OnboardingErrorStateMatcher;
  errors: any;

  constructor(
    private documentService: DocumentTypeRepositryService,
    private studentService: StudentRepositryService,
    private router: Router,
    private studentFormService: StudentFormService,
    private activatedRoute: ActivatedRoute,
    private customValidator: CustomValidatorService
    ) { }

  ngOnInit() {
    this.onboardingForm = this.studentFormService.getOnboardForm(null);
    this.documents = this.documentService.getDocuments()[StudentCategoryType.DOMESTIC];
    this.interpretFormRequest();
    this.matcher = new OnboardingErrorStateMatcher();
    this.errors = errorMessages;
  }

  /**
   * Interprets the form request, whether it is to add, view or edit.
   */
  interpretFormRequest() {
    this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.formTypeRequest = this.activatedRoute.snapshot.paramMap.get('request');

    if (this.studentId != null) {
      this.studentService.getStudent(+this.studentId).subscribe(
        student => {
          this.documents = this.documentService.getDocuments()[student.studentCategoryType];
          const stud = student;
          this.onboardingForm = this.studentFormService.getOnboardForm(stud);
          if (this.formTypeRequest === FormRequest.VIEW)  { this.disableForm(); }
        }
      );
    }
  }

  /**
   * Returns documents collection control.
   */
  get documentCheckboxes() {
    return this.onboardingForm.get('documentsCollection');
  }

  /**
   * On Selection change handler for student category type.
   */
  private OnChangeStudentCategoryType() {
    const studentCategoryTypeSelected = this.onboardingForm.get('studentCategoryType').value;
    this.documents = this.documentService.getDocuments()[studentCategoryTypeSelected];
  }

  /**
   * Method call for form submission.
   */
  private onRequestSubmit() {
    const documentProvided: boolean[] = this.onboardingForm.value.documentsCollection as boolean[];
    const studentCategoryType: StudentCategoryType = this.onboardingForm.value.studentCategoryType;
    const isMandatoryDocumentsPresent: boolean = this.customValidator.validateRequiredDocuments(documentProvided, studentCategoryType);

    if (this.onboardingForm.status.toLocaleLowerCase() === 'invalid' || !isMandatoryDocumentsPresent) {
      this.mandatoryDocumentsPresent = !isMandatoryDocumentsPresent;
      return;
    }

    const studentToAdd: Student = this.mapFormFieldsToStudent(this.onboardingForm.value);

    if (this.formTypeRequest === FormRequest.EDIT) {
      studentToAdd.id = +this.studentId;
      this.studentService.updateStudent(studentToAdd)
     .subscribe();
    } else {
    this.studentService.addStudent(studentToAdd)
     .subscribe();
    }

    this.router.navigateByUrl('/home/student-list');
  }

  /**
   * Maps form fields to student fields.
   *
   * @param formValue contains the form data.
   */
  private mapFormFieldsToStudent(formValue: any) {

    const studentToAdd: Student = {
      id: null,
      name: formValue.name,
      motherName: formValue.motherName,
      fatherName: formValue.fatherName,
      lastClassScore: formValue.lastClassScore,
      dob: formValue.dob,
      studentCategoryType: formValue.studentCategoryType,
      documents: [
        { name: DocumentType.DOMICILE, isPresent: false },
        { name: DocumentType.BIRTHCERTIFICATE, isPresent: false },
        { name: DocumentType.DECLARATION, isPresent: false },
        { name: DocumentType.MARKSHEETS, isPresent: false },
        { name: DocumentType.PASSPORT, isPresent: false },
        { name: DocumentType.POLICECLEARANCE, isPresent: false }
      ]
    };

    studentToAdd.documents.map((document, index) => {
      document.isPresent = formValue.documentsCollection[index];
    });

    return studentToAdd;
  }

  /**
   * Disables the form.
   */
  disableForm() {
    this.onboardingForm.disable();
  }
}
