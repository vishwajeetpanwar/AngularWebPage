import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

import { DocumentType } from 'src/app/home/shared/enums/document-type.enum';
import { StudentCategoryType } from '../home/shared/enums/student-category-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService implements InMemoryDbService {

  constructor() { }

  /**
   * In memory web api's in built function that provides data to fake api.
   */
  createDb() {
    const students = [
        {
          id: 1,
          name: 'Test student ABC',
          fatherName: 'Test Father',
          motherName: 'Test Mother',
          documents: [
            {name: DocumentType.DOMICILE, isPresent: true},
            {name: DocumentType.BIRTHCERTIFICATE, isPresent: true},
            {name: DocumentType.DECLARATION, isPresent: true},
            {name: DocumentType.MARKSHEETS, isPresent: true},
            {name: DocumentType.PASSPORT, isPresent: false},
            {name: DocumentType.POLICECLEARANCE, isPresent: true}
         ],
          dob: new Date(2010, 1, 10),
          studentCategoryType: StudentCategoryType.DOMESTIC,
          lastClassScore: 85
        },
        {
          id: 2,
          name: 'Test Student XYZ',
          fatherName: 'Test Father TWO',
          motherName: 'Test Mother TWO',
          documents: [
            {name: DocumentType.DOMICILE, isPresent: true},
            {name: DocumentType.BIRTHCERTIFICATE, isPresent: true},
            {name: DocumentType.DECLARATION, isPresent: true},
            {name: DocumentType.MARKSHEETS, isPresent: true},
            {name: DocumentType.PASSPORT, isPresent: true},
            {name: DocumentType.POLICECLEARANCE, isPresent: true}
         ],
          dob: new Date(1995, 10, 25),
          studentCategoryType: StudentCategoryType.INTERNATIONAL,
          lastClassScore: 72
        }
      ];

    return {students};
  }

}
