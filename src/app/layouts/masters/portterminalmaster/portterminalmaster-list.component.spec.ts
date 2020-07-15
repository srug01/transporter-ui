import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortterminalmasterListComponent } from './portterminalmaster-list.component';

describe('PortterminalmasterListComponent', () => {
  let component: PortterminalmasterListComponent;
  let fixture: ComponentFixture<PortterminalmasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortterminalmasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortterminalmasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
