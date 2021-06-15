import { TestBed, inject } from '@angular/core/testing';

import { ContentsearchService } from './contentsearch.service';

describe('ContentsearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentsearchService]
    });
  });

  it('should be created', inject([ContentsearchService], (service: ContentsearchService) => {
    expect(service).toBeTruthy();
  }));
});
