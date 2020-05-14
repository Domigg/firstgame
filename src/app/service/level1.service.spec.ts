import { TestBed } from '@angular/core/testing';

import { Level1Service } from './level1.service';

describe('Level1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Level1Service = TestBed.get(Level1Service);
    expect(service).toBeTruthy();
  });
});
