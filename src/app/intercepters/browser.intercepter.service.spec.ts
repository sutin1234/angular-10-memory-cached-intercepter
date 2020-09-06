import { TestBed } from '@angular/core/testing';

import { Browser.IntercepterService } from './browser.intercepter.service';

describe('Browser.IntercepterService', () => {
  let service: Browser.IntercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Browser.IntercepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
