import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FaqEntryModel} from '../model/faq-entry.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) {
  }

  /**
   * Returns all faq entries ordered by id
   */
  getAllEntries(): Observable<FaqEntryModel[]> {
    return this.http.get<Array<FaqEntryModel>>(`http://localhost:3000/entries?_sort=id&_order=desc`);
  }

  /**
   * Proceed to search for given queryand return the result ordered by id
   * @param query the given term to search
   */
  fullTextSearch(query: string): Observable<FaqEntryModel[]> {
    return this.http.get<Array<FaqEntryModel>>(`http://localhost:3000/entries?_sort=id&_order=desc&q=${query}`);
  }

  /**
   * Proceed to search on question and tags properties only for given term
   * @param query the given term to search
   */
  filterSearch(query: string): Observable<FaqEntryModel[]> {
    return this.http.get<Array<FaqEntryModel>>(`http://localhost:3000/entries?_sort=id&_order=desc`).pipe(
      map((results: Array<FaqEntryModel>) => results.filter(result => {
        if (result.question.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          result.tags.indexOf(query) !== -1) {
          return result;
        }
      }))
    );
  }

  /**
   * Add new entry in faq
   * @param body the entry object that contains question and response
   */
  addEntry(body: FaqEntryModel): void {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/entries', body, {headers}).subscribe(
      res => {},
      err => {
        console.log(err.message);
      }
    );
  }
}
