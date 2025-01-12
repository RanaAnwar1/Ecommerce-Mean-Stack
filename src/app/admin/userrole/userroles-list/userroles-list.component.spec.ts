import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrolesListComponent } from './userroles-list.component';

describe('UserrolesListComponent', () => {
  let component: UserrolesListComponent;
  let fixture: ComponentFixture<UserrolesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserrolesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserrolesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
