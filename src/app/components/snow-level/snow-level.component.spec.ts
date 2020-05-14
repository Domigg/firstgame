import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowLevelComponent } from './snow-level.component';

describe('SnowLevelComponent', () => {
  let component: SnowLevelComponent;
  let fixture: ComponentFixture<SnowLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
