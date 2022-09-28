import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluirTransacaoComponent } from './modal-excluir-transacao.component';

describe('ModalExcluirTransacaoComponent', () => {
  let component: ModalExcluirTransacaoComponent;
  let fixture: ComponentFixture<ModalExcluirTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExcluirTransacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExcluirTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
