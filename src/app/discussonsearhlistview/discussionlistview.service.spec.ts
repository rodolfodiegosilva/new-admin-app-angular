import { TestBed, inject } from '@angular/core/testing';

import { DiscussionlistviewService } from './discussionlistview.service';

describe('DiscussionlistviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscussionlistviewService]
    });
  });

  it('should be created', inject([DiscussionlistviewService], (service: DiscussionlistviewService) => {
    expect(service).toBeTruthy();
  }));
});
