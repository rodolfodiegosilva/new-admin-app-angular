import { TestBed, inject } from '@angular/core/testing';

import { CreateadminprofileService } from './createadminprofile.service';

describe('CreateadminprofileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateadminprofileService]
    });
  });

  it('should be created', inject([CreateadminprofileService], (service: CreateadminprofileService) => {
    expect(service).toBeTruthy();
  }));
});
