import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroleDetailsComponent } from './userrole-details.component';

describe('UserroleDetailsComponent', () => {
  let component: UserroleDetailsComponent;
  let fixture: ComponentFixture<UserroleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserroleDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserroleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
