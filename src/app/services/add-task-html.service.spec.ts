import { TestBed } from '@angular/core/testing';

import { AddTaskHtmlService } from './add-task-html.service';

describe('AddTaskHtmlService', () => {
  let service: AddTaskHtmlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTaskHtmlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
