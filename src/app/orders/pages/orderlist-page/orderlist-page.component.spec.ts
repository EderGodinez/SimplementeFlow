import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlistPageComponent } from './orderlist-page.component';

describe('OrderlistPageComponent', () => {
  let component: OrderlistPageComponent;
  let fixture: ComponentFixture<OrderlistPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderlistPageComponent]
    });
    fixture = TestBed.createComponent(OrderlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
