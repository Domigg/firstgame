import { TestBed } from '@angular/core/testing';

import { SnowService } from './snow.service';

describe('SnowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnowService = TestBed.get(SnowService);
    expect(service).toBeTruthy();
  });
});
