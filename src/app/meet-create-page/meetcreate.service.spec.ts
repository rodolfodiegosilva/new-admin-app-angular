import { TestBed, inject } from '@angular/core/testing';

import { MeetcreateService } from './meetcreate.service';

describe('MeetcreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeetcreateService]
    });
  });

  it('should be created', inject([MeetcreateService], (service: MeetcreateService) => {
    expect(service).toBeTruthy();
  }));
});
