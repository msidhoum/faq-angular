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

  /**
   * binding the form control for search input
   */
  searchInput = new FormControl();
  /**
   * list of faq entries to show
   */
  dataList: Array<FaqEntryModel> = [];
  /**
   * flag that indicates if user is authenticated for header menu links
   */
  authenticated: boolean;

  constructor(private faqService: FaqService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // load all results at startup
    this.faqService.getAllEntries().subscribe((list: Array<FaqEntryModel>) => {
      this.dataList = list;
    });

    // bind event to search input to apply new search for query
    this.searchInput.valueChanges.pipe(
      debounceTime(400),
    ).subscribe((value) => {
      this.faqService.fullTextSearch(value).subscribe( (result: Array<FaqEntryModel>) => this.dataList = result);
    });

    // init the authenticated flag
    this.authenticated = this.authenticationService.isAuthenticated();
  }

  /**
   * proceed to logout
   */
  logout(): void {
    this.authenticationService.signOut();
  }

}
