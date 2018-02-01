import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDesignItemComponent } from './web-design-item.component';

describe('WebDesignItemComponent', () => {
  let component: WebDesignItemComponent;
  let fixture: ComponentFixture<WebDesignItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebDesignItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebDesignItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
