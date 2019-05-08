import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {AuthResponseModel} from '../../model/auth-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = 'eve.holt@reqres.in';
  password = 'cityslicka';
  authStatus: string;

  constructor(private router: Router,
              private modalService: NgbModal,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authStatus = null;
  }

  signIn(): void {
    this.authStatus = null;
    this.authenticationService.signIn(this.login, this.password).subscribe((response: AuthResponseModel) => {
        if (response.token) {
          this.authStatus = 'success';
          this.authenticationService.storeAccessToken(response.token);
          // setTimeout(() => {
          this.router.navigateByUrl('/settings');
          // }, 1000);
        }
      },
      r => {
        this.authStatus = 'failed';
        console.log(r.error.error);
      });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // TODO send email to user to reset password
    }, (reason) => {
      // dismiss modal
    });
  }

}
