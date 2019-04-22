import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

import { StudentCategoryType } from '../enums/student-category-type.enum';
import { DocumentTypeRepositryService } from './document-type-repositry.service';
import { DocumentType } from 'src/app/home/shared/enums/document-type.enum';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  documentsRequired: {name: DocumentType, isMandatory: boolean}[];

  constructor(private documentService: DocumentTypeRepositryService) {
   }

  /**
   * Return boolean based on the validity of documents required against documents provided.
   *
   * @param documentProvided contain list of documents submitted.
   * @param studentCategoryType denotes student category; domestic or international.
   */
  validateRequiredDocuments(documentProvided: boolean[], studentCategoryType: StudentCategoryType): boolean {
    this.documentsRequired = this.documentService.getDocuments()[studentCategoryType];

    for (let index = 0; index < this.documentsRequired.length; index++) {
      if ((this.documentsRequired[index].isMandatory !== documentProvided[index])) {
        if (this.documentsRequired[index].isMandatory) {
          return false;
        }
      }
    }
    return true;
  }
}

export class OnboardingErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}

/**
 * Constant regex required for validators.pattern
 */
export const regExps: { [key: string]: RegExp } = {
  personName: /^[a-zA-Z]+(([ ][a-zA-Z])?[a-zA-Z]*)*$/
};

/**
 * Error messages required by validators.
 */
export const errorMessages: { [key: string]: string } = {
  personName: 'Name is required and must be between 1 and 20 characters without any special character (Son Goku).',
  score: 'Last class score is required and must be a number between 0 and 100',
  categoryType: 'Student category type is required',
  dob: 'Date of birth is required and must be between 1-Jan-1990 and 31-Dec-2016',
  documentsNotPresent: 'Required (*) documents are not checked'
};
