import { TestBed } from '@angular/core/testing';

import { StudentRepositryService } from './student-repositry.service';

describe('StudentRepositryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentRepositryService = TestBed.get(StudentRepositryService);
    expect(service).toBeTruthy();
  });
});
