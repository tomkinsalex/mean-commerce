import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCheckoutComponent } from './pre-checkout.component';

describe('PreCheckoutComponent', () => {
  let component: PreCheckoutComponent;
  let fixture: ComponentFixture<PreCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
