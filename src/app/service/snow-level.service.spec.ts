import { TestBed } from '@angular/core/testing';

import { SnowLevelService } from './snow-level.service';

describe('SnowLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnowLevelService = TestBed.get(SnowLevelService);
    expect(service).toBeTruthy();
  });
});
