import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomRowFrozeComponent} from './custom-row-froze.component';

describe('CustomRowFrozeComponent', () => {
  let component: CustomRowFrozeComponent;
  let fixture: ComponentFixture<CustomRowFrozeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomRowFrozeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRowFrozeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
