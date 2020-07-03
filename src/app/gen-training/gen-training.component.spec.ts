import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenTrainingComponent } from './gen-training.component';

describe('GenTrainingComponent', () => {
  let component: GenTrainingComponent;
  let fixture: ComponentFixture<GenTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
