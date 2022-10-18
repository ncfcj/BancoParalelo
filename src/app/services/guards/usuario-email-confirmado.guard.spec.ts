import { TestBed } from '@angular/core/testing';

import { UsuarioEmailConfirmadoGuard } from './usuario-email-confirmado.guard';

describe('UsuarioEmailConfirmadoGuard', () => {
  let guard: UsuarioEmailConfirmadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioEmailConfirmadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
