import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarCardapioComponent } from './alterar-cardapio.component';

describe('AlterarCardapioComponent', () => {
  let component: AlterarCardapioComponent;
  let fixture: ComponentFixture<AlterarCardapioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarCardapioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
