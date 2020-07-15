import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortterminalmasterFormComponent } from './portterminalmaster-form.component';

describe('PortterminalmasterFormComponent', () => {
  let component: PortterminalmasterFormComponent;
  let fixture: ComponentFixture<PortterminalmasterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortterminalmasterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortterminalmasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
