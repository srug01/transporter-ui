import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortterminalmasterComponent } from './portterminalmaster.component';

describe('PortterminalmasterComponent', () => {
  let component: PortterminalmasterComponent;
  let fixture: ComponentFixture<PortterminalmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortterminalmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortterminalmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
