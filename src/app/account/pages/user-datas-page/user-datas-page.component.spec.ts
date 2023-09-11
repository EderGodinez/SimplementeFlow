import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDatasPageComponent } from './user-datas-page.component';

describe('UserDatasPageComponent', () => {
  let component: UserDatasPageComponent;
  let fixture: ComponentFixture<UserDatasPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDatasPageComponent]
    });
    fixture = TestBed.createComponent(UserDatasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
