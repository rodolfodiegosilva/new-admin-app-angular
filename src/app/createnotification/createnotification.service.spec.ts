import { TestBed, inject } from '@angular/core/testing';

import { CreatenotificationService } from './createnotification.service';

describe('CreatenotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatenotificationService]
    });
  });

  it('should be created', inject([CreatenotificationService], (service: CreatenotificationService) => {
    expect(service).toBeTruthy();
  }));
});
