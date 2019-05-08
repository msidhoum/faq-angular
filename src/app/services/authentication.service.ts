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

  signIn(email: string, password: string): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>('https://reqres.in/api/login', {email, password});
  }

  signOut(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  storeAccessToken(value: string): void {
    localStorage.setItem(ACCESS_TOKEN, value);
  }

  isAuthenticated() {
    return localStorage.getItem(ACCESS_TOKEN) !== null;
  }
}
