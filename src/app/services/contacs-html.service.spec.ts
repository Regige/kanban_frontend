import { TestBed } from '@angular/core/testing';

import { ContacsHtmlService } from './contacs-html.service';

describe('ContacsHtmlService', () => {
  let service: ContacsHtmlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContacsHtmlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
