import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {CloudlistComponent} from './cloudlist/cloudlist.component';
import {CloudapplyComponent} from './cloudapply/cloudapply.component';
import {CloudComponent} from './cloud.component';
import {CloudFrameworkComponent} from './cloud-framework/cloud-framework.component';


const routes: Routes = [
  /**************挂自己功能组件 */

  // { path: '', component: BlogComponent, data: {'title': '博客'}},
  { path: '', component: CloudComponent, data:{'title': '服务器'}},
  {
    path: 'cloudlist', component: CloudlistComponent, data: {'title': '服务器列表'}
  },
  {
    path: 'cloudapply', component: CloudapplyComponent, data: {'title': '服务器申请'}
  },
  {path: 'cloudframework', component: CloudFrameworkComponent, data: {'title': '服务器架构'}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CloudRoutingModule {
}
