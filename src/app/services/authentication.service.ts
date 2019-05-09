import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthResponseModel} from '../model/auth-response.model';

const ACCESS_TOKEN = 'ACCESS_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private http: HttpClient) {
  }

  /**
   * Proceed to sign in the user
   * @param email given username
   * @param password given password
   */
  signIn(email: string, password: string): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>('https://reqres.in/api/login', {email, password});
  }

  /**
   * Proceed to logout, by removing just the access token from the local storage
   */
  signOut(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  /**
   * store the access token into local storage
   * @param value the token to store
   */
  storeAccessToken(value: string): void {
    localStorage.setItem(ACCESS_TOKEN, value);
  }

  /**
   * returns true if user is authenticated ie: if there is a token in local storage
   */
  isAuthenticated() {
    return localStorage.getItem(ACCESS_TOKEN) !== null;
  }
}
