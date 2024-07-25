import { TestBed } from '@angular/core/testing';

import { TouchJsService } from './touch.js.service';

describe('TouchJsService', () => {
  let service: TouchJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouchJsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
