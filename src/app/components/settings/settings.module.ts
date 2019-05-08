import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SettingsComponent} from './settings.component';
import {TagInputModule} from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    TagInputModule
  ],
  declarations: [SettingsComponent],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule {
}
