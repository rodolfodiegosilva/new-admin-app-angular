import { TestBed, inject } from '@angular/core/testing';

import { ManageinstituteService } from './manageinstitute.service';

describe('ManageinstituteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageinstituteService]
    });
  });

  it('should be created', inject([ManageinstituteService], (service: ManageinstituteService) => {
    expect(service).toBeTruthy();
  }));
});
