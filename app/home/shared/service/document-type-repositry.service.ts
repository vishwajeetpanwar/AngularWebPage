import { Injectable } from '@angular/core';

import { DocumentType } from '../enums/document-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeRepositryService {

  documentDataKey = 'documents';

  constructor() {
    this.saveDocumentToLocalStorage();
   }

   /**
    * Saves initial document data to localStorage if it does not already exists.
    */
   saveDocumentToLocalStorage() {
     const documents: { [id: string]: {name: DocumentType, isMandatory: boolean}[]} = {
      Domestic : [
        {name: DocumentType.DOMICILE, isMandatory: true},
        {name: DocumentType.BIRTHCERTIFICATE,  isMandatory: true},
        {name: DocumentType.DECLARATION,  isMandatory: true},
        {name: DocumentType.MARKSHEETS,  isMandatory: true},
        {name: DocumentType.PASSPORT,  isMandatory: false},
        {name: DocumentType.POLICECLEARANCE,  isMandatory: false}
     ],
     International : [
        {name: DocumentType.DOMICILE, isMandatory: true},
        {name: DocumentType.BIRTHCERTIFICATE,  isMandatory: true},
        {name: DocumentType.DECLARATION,  isMandatory: true},
        {name: DocumentType.MARKSHEETS,  isMandatory: true},
        {name: DocumentType.PASSPORT,  isMandatory: true},
        {name: DocumentType.POLICECLEARANCE,  isMandatory: true}
      ]
    };

     if (localStorage.getItem(this.documentDataKey) === null) {
      localStorage.setItem(this.documentDataKey, JSON.stringify(documents));
    }
   }

   /**
    * Gets all the documents from local storage.
    */
   getDocuments(): { [id: string]: {name: DocumentType, isMandatory: boolean}[]} {
      return JSON.parse(localStorage.getItem(this.documentDataKey));
   }
}
