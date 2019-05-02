import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReviewTableComponent } from './order-review-table.component';

describe('OrderReviewTableComponent', () => {
  let component: OrderReviewTableComponent;
  let fixture: ComponentFixture<OrderReviewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderReviewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
