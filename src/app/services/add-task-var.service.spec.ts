import { TestBed } from '@angular/core/testing';

import { AddTaskVarService } from './add-task-var.service';

describe('AddTaskVarService', () => {
  let service: AddTaskVarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTaskVarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
