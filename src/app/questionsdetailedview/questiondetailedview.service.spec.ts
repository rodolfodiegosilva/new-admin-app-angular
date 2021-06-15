import { TestBed, inject } from '@angular/core/testing';

import { QuestiondetailedviewService } from './questiondetailedview.service';

describe('QuestiondetailedviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestiondetailedviewService]
    });
  });

  it('should be created', inject([QuestiondetailedviewService], (service: QuestiondetailedviewService) => {
    expect(service).toBeTruthy();
  }));
});
