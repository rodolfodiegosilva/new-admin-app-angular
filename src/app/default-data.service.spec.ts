import { TestBed, inject } from '@angular/core/testing';

import { DefaultDataService } from './default-data.service';

describe('DefaultDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultDataService]
    });
  });

  it('should be created', inject([DefaultDataService], (service: DefaultDataService) => {
    expect(service).toBeTruthy();
  }));
});
