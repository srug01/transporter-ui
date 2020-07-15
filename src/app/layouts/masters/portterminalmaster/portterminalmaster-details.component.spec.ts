import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortterminalmasterDetailsComponent } from './portterminalmaster-details.component';

describe('PortterminalmasterDetailsComponent', () => {
  let component: PortterminalmasterDetailsComponent;
  let fixture: ComponentFixture<PortterminalmasterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortterminalmasterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortterminalmasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
