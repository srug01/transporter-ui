import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortterminalmasterNewComponent } from './portterminalmaster-new.component';

describe('PortterminalmasterNewComponent', () => {
  let component: PortterminalmasterNewComponent;
  let fixture: ComponentFixture<PortterminalmasterNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortterminalmasterNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortterminalmasterNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
