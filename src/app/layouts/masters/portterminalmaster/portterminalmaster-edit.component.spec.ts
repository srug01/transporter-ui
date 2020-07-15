import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortterminalmasterEditComponent } from './portterminalmaster-edit.component';

describe('PortterminalmasterEditComponent', () => {
  let component: PortterminalmasterEditComponent;
  let fixture: ComponentFixture<PortterminalmasterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortterminalmasterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortterminalmasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
