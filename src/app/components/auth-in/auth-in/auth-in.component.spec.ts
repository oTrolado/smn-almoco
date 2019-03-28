import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthInComponent } from './auth-in.component';

describe('AuthInComponent', () => {
  let component: AuthInComponent;
  let fixture: ComponentFixture<AuthInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
