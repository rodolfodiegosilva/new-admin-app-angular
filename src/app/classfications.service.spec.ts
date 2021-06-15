import { TestBed, inject } from '@angular/core/testing';

// import { ClassficationsService } from './classfications.service';

describe('ClassficationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
  });

  it('should be created', inject([], (service: any) => {
    expect(service).toBeTruthy();
  }));
});
