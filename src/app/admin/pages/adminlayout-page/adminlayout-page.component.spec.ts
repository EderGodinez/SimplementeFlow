import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlayoutPageComponent } from './adminlayout-page.component';

describe('AdminlayoutPageComponent', () => {
  let component: AdminlayoutPageComponent;
  let fixture: ComponentFixture<AdminlayoutPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminlayoutPageComponent]
    });
    fixture = TestBed.createComponent(AdminlayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
