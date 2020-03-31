import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {UserComponent} from '../user/user.component';
import {EmptyComponent} from './empty/empty.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {
    path: '', component: IndexComponent, children: [
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: 'welcome', component: WelcomeComponent, data: {reuse: false, track: false}},
      {path: 'user', component: UserComponent, data: {reuse: false, track: false}},
      {path: 'empty', component: EmptyComponent, data: {reuse: false, track: false}},
    ], data: {reuse: false, track: false}
  },
];

@NgModule({
  declarations: [
    IndexComponent,
    WelcomeComponent,
    UserComponent,
    EmptyComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    NgZorroAntdModule,
    CommonModule
  ],
  exports: [RouterModule]
})
export class IndexModule {
}
