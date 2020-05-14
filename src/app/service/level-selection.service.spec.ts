import { TestBed } from '@angular/core/testing';

import { LevelSelectionService } from './level-selection.service';

describe('LevelSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LevelSelectionService = TestBed.get(LevelSelectionService);
    expect(service).toBeTruthy();
  });
});
