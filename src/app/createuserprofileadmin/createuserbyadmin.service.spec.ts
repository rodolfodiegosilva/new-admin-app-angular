import { TestBed, inject } from '@angular/core/testing';

import { CreateuserbyadminService } from './createuserbyadmin.service';

describe('CreateuserbyadminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateuserbyadminService]
    });
  });

  it('should be created', inject([CreateuserbyadminService], (service: CreateuserbyadminService) => {
    expect(service).toBeTruthy();
  }));
});
