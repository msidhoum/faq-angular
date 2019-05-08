import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FaqService} from '../../services/faq.service';
import {FaqEntryModel} from '../../model/faq-entry.model';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  input = new FormControl();
  dataList: Array<FaqEntryModel> = [];
  authenticated: boolean;

  constructor(private faqService: FaqService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.faqService.getAllEntries().subscribe((list: Array<FaqEntryModel>) => {
      this.dataList = list;
    });

    this.input.valueChanges.pipe(
      debounceTime(400),
    ).subscribe((value) => {
      this.faqService.fullTextSearch(value).subscribe( (result: Array<FaqEntryModel>) => this.dataList = result);
    });

    this.authenticated = this.authenticationService.isAuthenticated();
  }

  logout(): void {
    this.authenticationService.signOut();
  }

}
