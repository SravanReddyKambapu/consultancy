import { TestBed } from '@angular/core/testing';

import { AutoUnsubscribeService } from './auto-unsubscribe.service';

describe('AutoUnsubscribeService', () => {
  let service: AutoUnsubscribeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoUnsubscribeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
