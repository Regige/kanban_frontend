import { TestBed } from '@angular/core/testing';

import { BoardHtmlService } from './board-html.service';

describe('BoardHtmlService', () => {
  let service: BoardHtmlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardHtmlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
