import { TestBed } from '@angular/core/testing';

import { CandidateSelectionService } from './candidate-selection.service';

describe('CandidateSelectionService', () => {
  let service: CandidateSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
