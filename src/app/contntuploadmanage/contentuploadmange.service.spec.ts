import { TestBed, inject } from '@angular/core/testing';

import { ContentuploadmangeService } from './contentuploadmange.service';

describe('ContentuploadmangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentuploadmangeService]
    });
  });

  it('should be created', inject([ContentuploadmangeService], (service: ContentuploadmangeService) => {
    expect(service).toBeTruthy();
  }));
});
