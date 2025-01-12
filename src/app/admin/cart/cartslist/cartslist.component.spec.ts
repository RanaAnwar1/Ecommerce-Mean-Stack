import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartslistComponent } from './cartslist.component';

describe('CartslistComponent', () => {
  let component: CartslistComponent;
  let fixture: ComponentFixture<CartslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
