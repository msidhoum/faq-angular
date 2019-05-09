import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FaqService} from '../../services/faq.service';
import {AuthenticationService} from '../../services/authentication.service';
import {FormControl} from '@angular/forms';
import {FaqEntryModel} from '../../model/faq-entry.model';
import {debounceTime} from 'rxjs/operators';
import {NgbTabChangeEvent, NgbTabset} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None // to apply style css on sub components
})
export class SettingsComponent implements OnInit {

  // tab component to bind
  @ViewChild('tabSet') tabSet: NgbTabset;

  // search inpur form control
  searchInput = new FormControl();

  // list of result
  dataList: Array<FaqEntryModel> = [];

  // form binding attributes
  question = '';
  response = '';
  tags = [];

  constructor(private router: Router,
              private faqService: FaqService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // get all result when loading the component
    this.faqService.getAllEntries().subscribe((list: Array<FaqEntryModel>) => {
      this.dataList = list;
    });

    // attach event when search input value changes to search new results
    this.searchInput.valueChanges.pipe(
      debounceTime(400),
    ).subscribe((value) => {
      this.faqService.filterSearch(value).subscribe((result: Array<FaqEntryModel>) => this.dataList = result);
    });
  }

  /**
   * fired when tab clicked
   * @param $event NgbTabChangeEvent
   */
  beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'ngb-tab-0') {
      this.faqService.getAllEntries().subscribe((list: Array<FaqEntryModel>) => {
        this.dataList = list;
      });
    }
    this.searchInput.setValue('');
  }

  /**
   * proceed to logout
   */
  logout(): void {
    this.authenticationService.signOut();
    this.router.navigateByUrl('/login');
  }

  /**
   * Submit new question/response into the faq db
   */
  submitNewQuestion(): void {
    if (this.question && this.response) {
      this.faqService.addEntry({
        question: this.question,
        response: this.response,
        tags: this.tags.map(t => t.value)
      } as FaqEntryModel);
      // reset form
      this.question = '';
      this.response = '';
      this.tags = [];

      // refresh data list and go to first tab
      this.faqService.getAllEntries().subscribe((list: Array<FaqEntryModel>) => {
        this.dataList = list;
        this.tabSet.select('ngb-tab-0');
      });
    }
  }

}
