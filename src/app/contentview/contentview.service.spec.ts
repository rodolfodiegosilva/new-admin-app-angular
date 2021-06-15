import { TestBed, inject } from '@angular/core/testing';

import { ContentviewService } from './contentview.service';

describe('ContentviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentviewService]
    });
  });

  it('should be created', inject([ContentviewService], (service: ContentviewService) => {
    expect(service).toBeTruthy();
  }));
});
