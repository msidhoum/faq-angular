import { TestBed } from '@angular/core/testing';

import { FaqService } from './faq.service';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {TagInputModule} from 'ngx-chips';

describe('FaqService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, NgbModule, HttpClientModule, TagInputModule],

  }));

  it('FaqService should be created with success', () => {
    const service: FaqService = TestBed.get(FaqService);
    expect(service).toBeTruthy();
  });
});
