import { TestBed, inject } from '@angular/core/testing';

import { TestcreateService } from './testcreate.service';

describe('TestcreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestcreateService]
    });
  });

  it('should be created', inject([TestcreateService], (service: TestcreateService) => {
    expect(service).toBeTruthy();
  }));
});
