import { TestBed } from '@angular/core/testing';

import { DocumentTypeRepositryService } from './document-type-repositry.service';

describe('DocumentTypeRepositryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentTypeRepositryService = TestBed.get(DocumentTypeRepositryService);
    expect(service).toBeTruthy();
  });
});
