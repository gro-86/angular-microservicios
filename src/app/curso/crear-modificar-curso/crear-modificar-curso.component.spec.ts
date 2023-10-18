import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarCursoComponent } from './crear-modificar-curso.component';

describe('CrearModificarCursoComponent', () => {
  let component: CrearModificarCursoComponent;
  let fixture: ComponentFixture<CrearModificarCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearModificarCursoComponent]
    });
    fixture = TestBed.createComponent(CrearModificarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
