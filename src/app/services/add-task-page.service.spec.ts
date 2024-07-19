import { TestBed } from '@angular/core/testing';

import { AddTaskPageService } from './add-task-page.service';

describe('AddTaskPageService', () => {
  let service: AddTaskPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTaskPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
